import { Navigate, useNavigate, useParams } from "react-router-dom";

import ProductForm from "../../components/products/ProductForm.jsx";

import { productService } from "../../services/productService.js";

export default function EdithProducts() {
  const { id } = useParams();

  const navigate = useNavigate();

  const product = productService.getById(id);

  if (!product) return <Navigate to="/products" replace />;

  const handleSubmit = (updates) => {
    productService.update(id, updates);
    navigate("/products");
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
