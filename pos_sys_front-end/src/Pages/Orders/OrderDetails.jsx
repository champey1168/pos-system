import { useState } from "react";

import { Link, useParams } from "react-router-dom";

import Button from "../../components/Common/Button.jsx";

import { Printer } from "lucide-react";

import OrderDetails from "../../components/Order/OrderDetails.jsx";

import { printInvoice } from "../../Utils/invoice.js";

import { useAuth } from "../../hooks/useAuth.js";

import { useToast } from "../../hooks/useToast.js";

import { orderService } from "../../services/orderService.js";

export default function OrderDetailsPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(() => orderService.getById(id));

  const { currentUser } = useAuth();

  const { notify } = useToast();

  const changeStatus = (status) => {
    orderService.updateStatus(id, status);
    setOrder(orderService.getById(id));
    notify(`Order status changed to ${status}.`);
  };

  return (
    <section className="stack">
      <div className="section-head">
        <div>
          <h2>Order Details</h2>
          <p>Complete receipt, customer, products, totals, and status.</p>
        </div>
        <div className="actions">
          {order?.status === "Completed" ? (
            <Button
              variant="ghost"
              icon={Printer}
              onClick={() => printInvoice(order, currentUser?.name)}
            >
              Print Invoice
            </Button>
          ) : null}
          <Link to="/orders">
            <Button variant="ghost">Back to Orders</Button>
          </Link>
        </div>
      </div>
      <OrderDetails order={order} onStatusChange={changeStatus} />
    </section>
  );
}
