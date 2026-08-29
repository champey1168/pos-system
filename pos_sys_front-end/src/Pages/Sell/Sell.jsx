import { useState, useMemo } from "react";
import ProductFilter from "../../components/products/ProductFilter.jsx";
import ProductGrid from "../../components/products/ProductGrid.jsx";
import ProductModal from "../../components/products/productmodal.jsx";
import CurrentOrder from "../../components/Orders/CurrentOrder.jsx";
import useCart from "../../hooks/useCart.js";
import useProducts from "../../hooks/useProducts.js";
import { useAuth } from "../../hooks/useAuth.js";
import { orderService } from "../../services/orderService.js";
import { printInvoice } from "../../Utils/invoice.js";
import { useToast } from "../../hooks/useToast.js";
import { categories } from "../../data/category.js";

export default function POS() {
  const cart = useCart();
  const { currentUser } = useAuth();

  const { products, filteredProducts, category, setCategory, refresh } =
    useProducts("", "All", true);

  const activeCategories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return categories.filter((c) => c.name === "All" || cats.has(c.name));
  }, [products]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const { notify } = useToast();

  const completePayment = async () => {
    const order = {
      items: cart.items,
      subtotal: cart.subtotal,
      discount: cart.discountAmount,
      total: cart.total,
      paymentMethod: "Cash",
      amountReceived: cart.total,
      change: 0,
      status: "Completed",
    };

    setCheckingOut(true);

    try {
      const created = await orderService.create(order);
      await refresh();
      cart.clearCart();
      printInvoice(created, currentUser?.name);
      notify(`Payment completed. ${created.id} created.`);
    } catch (err) {
      notify(err.message || "Payment failed.", "error");
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className="pos-layout" style={styles.posLayout}>
      <section className="pos-products panel flat" style={styles.posProducts}>
        {/* Filter Bar នៅខាងលើរហូត ដោយសារ flexShrink: 0 */}
        <div style={styles.filterWrapper}>
          <ProductFilter
            categories={activeCategories}
            category={category}
            onCategoryChange={setCategory}
          />
        </div>

        {/* Product Grid អាច Scroll ចុះក្រោមបានដោយមិនបាំង Filter */}
        <div style={styles.gridWrapper}>
          <ProductGrid
            products={filteredProducts}
            onSelect={(product) => setSelectedProduct(product)}
          />
        </div>
      </section>

      <CurrentOrder cart={cart} onCheckout={completePayment} checkingOut={checkingOut} />

      <ProductModal
        product={selectedProduct}
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAdd={(product, options) => {
          cart.addToCart(product, options);
          setSelectedProduct(null);
          notify(`${product.name} added to order.`);
        }}
      />
    </div>
  );
}

const styles = {
  posLayout: {
    display: "flex",
    gap: "20px",
    height: "calc(100vh - 90px)",
    overflow: "hidden",
  },
  posProducts: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
  },
  filterWrapper: {
    flexShrink: 0, // បង្ខំឱ្យ Filter នៅនឹងមួយកន្លែងមិនឱ្យរញ៉េរញ៉ៃ
    marginBottom: "16px",
  },
  gridWrapper: {
    flex: 1,
    overflowY: "auto", // ឱ្យ Scroll តែលើ Product Cards ប៉ុណ្ណោះ
    paddingRight: "4px",
  },
};