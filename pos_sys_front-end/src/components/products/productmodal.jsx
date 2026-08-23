import { useState } from "react";

import { Minus, Plus } from "lucide-react";

import { formatCurrency } from "../../Utils/currency.js";

import Button from "../Common/Button.jsx";
import Modal from "../Common/Modal.jsx";

const sizes = ["Small", "Medium", "Large"];

const sugarLevels = [0, 25, 50, 75, 100];

function ProductModalContent({ product, onClose, onAdd }) {
  const [size, setSize] = useState("Medium");
  const [sugar, setSugar] = useState(50);
  const [quantity, setQuantity] = useState(1);
  const [remarks, setRemarks] = useState("");

  const price =
    product.price + (size === "Large" ? 0.5 : size === "Small" ? -0.2 : 0);

  const add = () => {
    onAdd(product, { size, sugar, quantity, remarks });

    setQuantity(1);
    setRemarks("");
  };

  return (
    <Modal
      open
      title={product.name}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={add}>Add to Order</Button>
        </>
      }
    >
      <div className="product-modal-head">
        <img src={product.image} alt={product.name} />
        <strong>{formatCurrency(price)}</strong>
      </div>

      <div className="option-group">
        <span>Sugar Level</span>
        <div>
          {sugarLevels.map((level) => (
            <button
              type="button"
              key={level}
              onClick={() => setSugar(level)}
              className={sugar === level ? "selected" : ""}
            >
              {level}%
            </button>
          ))}
        </div>
      </div>

      <div className="option-group">
        <span>Size</span>
        <div>
          {sizes.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setSize(item)}
              className={size === item ? "selected" : ""}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="qty-control">
        <button
          type="button"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Minus size={16} />
        </button>
        <strong>{quantity}</strong>
        <button type="button" onClick={() => setQuantity(quantity + 1)}>
          <Plus size={16} />
        </button>
      </div>

      <label className="field">
        <span>
          Remarks <em>(optional)</em>
        </span>
        <input
          className="input"
          value={remarks}
          onChange={(event) => setRemarks(event.target.value)}
          placeholder="Add note here..."
        />
      </label>
    </Modal>
  );
}

export default function ProductModal({ product, open, onClose, onAdd }) {
  if (!product || !open) return null;

  return (
    <ProductModalContent
      key={product.id}
      product={product}
      onClose={onClose}
      onAdd={onAdd}
    />
  );
}
