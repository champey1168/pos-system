import { useNavigate } from "react-router-dom";

import ProductForm from "../../components/products/ProductForm.jsx";

import { productService } from "../../services/productService.js";

export default function AddProduct() {
  const navigate = useNavigate();

  const handleSubmit = (product) => {
    productService.save(product);
    navigate("/products");
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
