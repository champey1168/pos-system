import { useState, useMemo } from "react";

import ProductFilter from "../../components/products/ProductFilter.jsx";

import ProductGrid from "../../components/products/ProductGrid.jsx";

import ProductModal from "../../components/products/productmodal.jsx";

import CurrentOrder from "../../components/Orders/CurrentOrder.jsx";

import useCart from "../../hooks/useCart.js";

import useProducts from "../../hooks/useProducts.js";

import { useAuth } from "../../hooks/useAuth.js";

import { orderService } from "../../services/orderService.js";

import { productService } from "../../services/productService.js";

import { printInvoice } from "../../Utils/invoice.js";

import { useToast } from "../../hooks/useToast.js";

import { categories } from "../../data/category.js";

export default function POS() {
  const cart = useCart();

  const { currentUser } = useAuth();

  const { products, filteredProducts, category, setCategory } = useProducts(
    "",
    "All",
  );

  const activeCategories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return categories.filter((c) => c.name === "All" || cats.has(c.name));
  }, [products]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const { notify } = useToast();

  const completePayment = () => {
    const order = orderService.create({
      items: cart.items,
      subtotal: cart.subtotal,
      discount: cart.discountAmount,
      total: cart.total,
      paymentMethod: "Cash",
      amountReceived: cart.total,
      change: 0,
      status: "Completed",
    });

    const products = productService.getAll().map((product) => {
      const sold = cart.items
        .filter((item) => item.productId === product.id)
        .reduce((sum, item) => sum + item.quantity, 0);

      return sold
        ? { ...product, stock: Math.max(product.stock - sold, 0) }
        : product;
    });

    productService.replaceAll(products);

    cart.clearCart();

    printInvoice(order, currentUser?.name);

    notify(`Payment completed. ${order.id} created.`);
  };

  return (
    <div className="pos-layout">
      <section className="pos-products panel flat">
        <ProductFilter
          categories={activeCategories}
          category={category}
          onCategoryChange={setCategory}
        />

        <ProductGrid
          products={filteredProducts}
          onSelect={(product) => setSelectedProduct(product)}
        />
      </section>

      <CurrentOrder cart={cart} onCheckout={completePayment} />

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
