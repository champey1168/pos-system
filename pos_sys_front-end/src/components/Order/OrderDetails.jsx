import { formatCurrency } from "../../Utils/currency.js";
import OrderStatus from "./OrderStatus.jsx";

export default function OrderDetails({ order, onStatusChange }) {
  if (!order)
    return (
      <div className="empty-state">
        <strong>Order not found.</strong>
        <span>The order may have been removed.</span>
      </div>
    );
  return (
    <div className="detail-grid">
      <section className="panel">
        <h2>Order Information</h2>
        <dl className="details">
          <div>
            <dt>Order ID</dt>
            <dd>{order.id}</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>{new Date(order.createdAt).toLocaleString()}</dd>
          </div>
          <div>
            <dt>Customer</dt>
            <dd>{order.customerName || "Walk-in"}</dd>
          </div>
          <div>
            <dt>Payment</dt>
            <dd>{order.paymentMethod}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <OrderStatus value={order.status} onChange={onStatusChange} />
            </dd>
          </div>
        </dl>
      </section>

      <section className="panel">
        <h2>Products</h2>
        <div className="receipt-lines">
          {order.items.map((item) => (
            <div key={item.key}>
              <span>
                {item.name} x{item.quantity}
                <small>
                  {item.size} / Sugar {item.sugar}%
                </small>
              </span>
              <strong>{formatCurrency(item.price * item.quantity)}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Totals</h2>
        <div className="summary-box compact">
          <div>
            <span>Subtotal</span>
            <strong>{formatCurrency(order.subtotal)}</strong>
          </div>
          <div>
            <span>Discount</span>
            <strong>{formatCurrency(order.discount)}</strong>
          </div>
          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(order.total)}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
