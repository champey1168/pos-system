import ProductCard from "./productCard.jsx";

export default function ProductGrid({ products, onSelect }) {
  if (!products.length)
    return (
      <div className="empty-state">
        <strong>No products found.</strong>
        <span>Adjust search or category filters.</span>
      </div>
    );

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelect} />
      ))}
    </div>
  );
}
