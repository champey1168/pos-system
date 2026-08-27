import { Minus, Plus, Trash2 } from "lucide-react";

import { formatCurrency } from "../../Utils/currency.js";

export default function OrderItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <article className="order-item">
      <img
        alt={item.name}
        src={
          item.image
            ? `/pos-assets/${item.image}`
            : "/pos-assets/iced-latte.png"
        }
      />

      <div>
        <div className="order-item-top">
          <strong>{item.name}</strong>
          <span>{formatCurrency(item.price * item.quantity)}</span>
        </div>

        <small>x{item.quantity}</small>

        {item.remarks ? <small>{item.remarks}</small> : null}

        <div className="line-actions">
          <button
            type="button"
            onClick={onDecrease}
            aria-label={`Decrease ${item.name}`}
          >
            <Minus size={15} />
          </button>
          <button
            type="button"
            onClick={onIncrease}
            aria-label={`Increase ${item.name}`}
          >
            <Plus size={15} />
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
