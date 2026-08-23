import { formatCurrency } from "../../Utils/currency.js";

export default function OrderSummary({ subtotal, total }) {
  return (
    <div className="summary-box">
      <div>
        <span>Subtotal</span>
        <strong>{formatCurrency(subtotal)}</strong>
      </div>

      <div className="total">
        <span>Total</span>
        <strong>{formatCurrency(total)}</strong>
      </div>
    </div>
  );
}
