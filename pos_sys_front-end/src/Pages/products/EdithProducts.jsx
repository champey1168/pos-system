import { useEffect, useState } from "react";

import { Navigate, useNavigate, useParams } from "react-router-dom";

import ProductForm from "../../components/products/ProductForm.jsx";

import { useToast } from "../../hooks/useToast.js";

import { productService } from "../../services/productService.js";

export default function EdithProducts() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { notify } = useToast();

  const [product, setProduct] = useState(() => productService.getById(id));

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await productService.refresh();
      if (!cancelled) {
        setProduct(productService.getById(id));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!product) return <Navigate to="/products" replace />;

  const handleSubmit = async (updates) => {
    try {
      await productService.update(id, updates);
      notify("Product updated.");
      navigate("/products");
    } catch (err) {
      notify(err.message || "Failed to update product.", "error");
    }
  };

  return (
    <section className="page">
      <header className="page-header">
        <h1>Edit Product</h1>
      </header>

      <ProductForm
        initialProduct={product}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </section>
  );
}
