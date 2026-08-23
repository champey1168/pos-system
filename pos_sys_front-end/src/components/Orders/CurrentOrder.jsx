import { ShoppingCart, Trash2 } from "lucide-react";

import Button from "../Common/Button.jsx";
import OrderItem from "./OrderItem.jsx";
import OrderSummary from "./OrderSummary.jsx";

export default function CurrentOrder({ cart, onCheckout }) {
  return (
    <aside className="current-order">
      <header>
        <h2>Current Order</h2>
        <button type="button" onClick={cart.clearCart}>
          <Trash2 size={17} />
          Clear
        </button>
      </header>

      <div className="order-list">
        {cart.items.length ? (
          cart.items.map((item) => (
            <OrderItem
              key={item.key}
              item={item}
              onIncrease={() => cart.increaseQuantity(item.key)}
              onDecrease={() => cart.decreaseQuantity(item.key)}
              onRemove={() => cart.removeFromCart(item.key)}
            />
          ))
        ) : (
          <div className="empty-state small">
            <strong>No items yet.</strong>
            <span>Add a product to begin an order.</span>
          </div>
        )}
      </div>

      <div className="order-bottom">
        <OrderSummary subtotal={cart.subtotal} total={cart.total} />
        <Button
          icon={ShoppingCart}
          size="lg"
          disabled={!cart.items.length}
          onClick={onCheckout}
        >
          Checkout
        </Button>
      </div>
    </aside>
  );
}
