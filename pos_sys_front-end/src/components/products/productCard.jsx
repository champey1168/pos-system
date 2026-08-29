import { Plus } from "lucide-react";
import { formatCurrency } from "../../Utils/currency.js";
import Button from "../Common/Button.jsx";

export default function ProductCard({ product, onSelect }) {
  const lowStock = Number(product.stock) <= 5;

  return (
    <article className="product-card" style={styles.card}>
      <button
        type="button"
        onClick={() => onSelect(product)}
        className="product-card-main"
        aria-label={`Customize ${product.name}`}
        style={styles.mainButton}
      >
        {/* Container សម្រាប់រូបភាព និង Badge */}
        <div style={styles.imageContainer}>
          <span
            className={`stock-pill ${lowStock ? "low" : ""}`}
            style={styles.stockPill}
          >
            {lowStock ? "Low stock" : `${product.stock} in stock`}
          </span>

          <img
            src={
              product.image
                ? `/pos-assets/${product.image}`
                : "/pos-assets/iced-latte.png"
            }
            alt={product.name}
            style={styles.image}
          />
        </div>

        <strong style={styles.title}>{product.name}</strong>
      </button>

      <footer style={styles.footer}>
        <span style={styles.price}>{formatCurrency(product.price)}</span>
        <Button size="sm" icon={Plus} onClick={() => onSelect(product)}>
          Add
        </Button>
      </footer>
    </article>
  );
}

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "12px",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  mainButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: "0",
  },
  imageContainer: {
    position: "relative", // សម្រាប់ឱ្យ stockPill រត់តាម Container នេះ
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "8px",
  },
  stockPill: {
    position: "absolute",
    top: "0px",
    left: "0px",
    zIndex: 1, // ដាក់ឱ្យនៅលើរូបភាពបន្តិច
  },
  image: {
    width: "100%",
    height: "130px",
    objectFit: "contain",
  },
  title: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "8px",
    textAlign: "center",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    width: "100%",
  },
  price: {
    fontWeight: "700",
    fontSize: "15px",
    color: "#15803d",
  },
};