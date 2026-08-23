import { useState } from "react";

import OrderTable from "../../components/Order/OrderTable.jsx";

import { useToast } from "../../hooks/useToast.js";

import { orderService } from "../../services/orderService.js";

export default function Orders() {
  const [orders, setOrders] = useState(() => orderService.getAll());

  const { notify } = useToast();

  const changeStatus = (id, status) => {
    orderService.updateStatus(id, status);

    setOrders(orderService.getAll());

    notify(`Order status changed to ${status}.`);
  };

  return (
    <section className="stack">
      <div className="section-head">
        <div>
          <h2>Orders</h2>
          <p>Review sales, payment methods, and fulfillment status.</p>
        </div>
      </div>
      <OrderTable orders={orders} onStatusChange={changeStatus} />
    </section>
  );
}
