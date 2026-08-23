import { Link } from "react-router-dom";

import { Edit, Eye, Plus, Trash2 } from "lucide-react";

import { useMemo, useState } from "react";

import Button from "../../components/Common/Button.jsx";

import ConfirmModal from "../../components/Common/ConfirmModal.jsx";

import ProductFilter from "../../components/products/ProductFilter.jsx";

import ProductModal from "../../components/products/productmodal.jsx";

import Table from "../../components/Common/Table.jsx";

import { useAuth } from "../../hooks/useAuth.js";

import { useToast } from "../../hooks/useToast.js";

import useCart from "../../hooks/useCart.js";

import useProducts from "../../hooks/useProducts.js";

import { formatCurrency } from "../../Utils/currency.js";

import { productService } from "../../services/productService.js";

import { categories } from "../../data/category.js";

export default function Products() {
  const { filteredProducts, category, setCategory, refresh } = useProducts();

  const [viewProduct, setViewProduct] = useState(null);

  const [deleteProduct, setDeleteProduct] = useState(null);

  const cart = useCart();

  const { notify } = useToast();

  const { currentUser } = useAuth();

  const canManage = currentUser?.role !== "Cashier";

  const columns = useMemo(
    () => [
      {
        key: "image",
        header: "Image",
        render: (product) => (
          <img className="table-image" src={product.image} alt={product.name} />
        ),
      },
      { key: "name", header: "Name" },
      { key: "category", header: "Category" },

      {
        key: "price",
        header: "Price",
        render: (product) => formatCurrency(product.price),
      },
      {
        key: "cost",
        header: "Cost",
        render: (product) => formatCurrency(product.cost),
      },
      { key: "stock", header: "Stock" },
      {
        key: "status",
        header: "Status",
        render: (product) => (
          <span className={`status status-${product.status.toLowerCase()}`}>
            {product.status}
          </span>
        ),
      },

      {
        key: "actions",
        header: "Actions",
        render: (product) => (
          <div className="row-actions">
            <button type="button" onClick={() => setViewProduct(product)}>
              <Eye size={16} />
              View
            </button>
            {canManage && (
              <>
                <Link to={`/products/edit/${product.id}`}>
                  <Edit size={16} />
                  Edit
                </Link>
                <button type="button" onClick={() => setDeleteProduct(product)}>
                  <Trash2 size={16} />
                  Delete
                </button>
              </>
            )}
          </div>
        ),
      },
    ],
    [canManage],
  );

  const confirmDelete = () => {
    productService.remove(deleteProduct.id);

    setDeleteProduct(null);

    refresh();

    notify("Product deleted.");
  };
  return (
    <section className="stack">
      <div className="section-head">
        <div>
          <h2>Products</h2>
        </div>
        {canManage && (
          <Link to="/products/add">
            <Button icon={Plus}>Add Product</Button>
          </Link>
        )}
      </div>

      <div className="filter-row">
        <ProductFilter
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
        />
      </div>

      <Table
        columns={columns}
        data={filteredProducts}
        empty="No products found."
      />

      <ProductModal
        product={viewProduct}
        open={Boolean(viewProduct)}
        onClose={() => setViewProduct(null)}
        onAdd={(product, options) => {
          cart.addToCart(product, options);
          setViewProduct(null);
          notify(`${product.name} added to order.`);
        }}
      />

      <ConfirmModal
        open={Boolean(deleteProduct)}
        title="Delete product"
        message={`Delete ${deleteProduct?.name}? This removes it from POS and product lists.`}
        onCancel={() => setDeleteProduct(null)}
        onConfirm={confirmDelete}
        confirmLabel="Delete"
      />
    </section>
  );
}
