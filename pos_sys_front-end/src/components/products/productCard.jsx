import { Plus } from "lucide-react";

import { formatCurrency } from "../../Utils/currency.js";

import Button from "../Common/Button.jsx";

export default function ProductCard({ product, onSelect }) {
  const lowStock = Number(product.stock) <= 5;

  return (
    <article className="product-card">
      <button
        type="button"
        onClick={() => onSelect(product)}
        className="product-card-main"
        aria-label={`Customize ${product.name}`}
      >
        <span className={`stock-pill ${lowStock ? "low" : ""}`}>
          {lowStock ? "Low stock" : `${product.stock} in stock`}
        </span>

        <img
          src={
            product.image
              ? `/pos-assets/${product.image}`
              : "/pos-assets/iced-latte.png"
          }
          alt={product.name}
        />

        <strong>{product.name}</strong>
      </button>

      <footer>
        <span>{formatCurrency(product.price)}</span>
        <Button size="sm" icon={Plus} onClick={() => onSelect(product)}>
          Add
        </Button>
      </footer>
    </article>
  );
}
