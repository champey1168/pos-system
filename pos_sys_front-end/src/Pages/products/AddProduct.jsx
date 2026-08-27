import { useNavigate } from "react-router-dom";

import ProductForm from "../../components/products/ProductForm.jsx";

import { useToast } from "../../hooks/useToast.js";

import { productService } from "../../services/productService.js";

export default function AddProduct() {
  const navigate = useNavigate();

  const { notify } = useToast();

  const handleSubmit = async (product) => {
    try {
      await productService.save(product);
      notify("Product added.");
      navigate("/products");
    } catch (err) {
      notify(err.message || "Failed to add product.", "error");
    }
  };

  return (
    <section className="page">
      <header className="page-header">
        <h1>Add Product</h1>
      </header>

      <ProductForm onSubmit={handleSubmit} submitLabel="Add Product" />
    </section>
  );
}
