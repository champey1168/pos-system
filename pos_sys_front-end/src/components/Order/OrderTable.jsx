import { Link } from "react-router-dom";

import { Eye, Printer } from "lucide-react";

import { formatCurrency } from "../../Utils/currency.js";

import { printInvoice } from "../../Utils/invoice.js";

import Table from "../Common/Table.jsx";

import OrderStatus from "./OrderStatus.jsx";

export default function OrderTable({ orders, onStatusChange }) {
  const columns = [
    { key: "id", header: "Order ID" },

    {
      key: "customerName",
      header: "Customer",
      render: (order) => order.customerName || "Walk-in",
    },

    {
      key: "createdAt",
      header: "Date",
      render: (order) => new Date(order.createdAt).toLocaleString(),
    },

    {
      key: "items",
      header: "Items",
      render: (order) =>
        order.items.reduce((sum, item) => sum + item.quantity, 0),
    },

    {
      key: "subtotal",
      header: "Subtotal",
      render: (order) => formatCurrency(order.subtotal),
    },
    {
      key: "total",
      header: "Total",
      render: (order) => formatCurrency(order.total),
    },

    { key: "paymentMethod", header: "Payment" },

    {
      key: "status",
      header: "Status",
      render: (order) => (
        <OrderStatus
          value={order.status}
          onChange={(status) => onStatusChange(order.id, status)}
        />
      ),
    },

    {
      key: "actions",
      header: "Actions",
      render: (order) => (
        <div className="row-actions">
          {order.status === "Completed" ? (
            <button className="icon-link" onClick={() => printInvoice(order)}>
              <Printer size={16} />
              Print
            </button>
          ) : null}
          <Link className="icon-link" to={`/orders/${order.id}`}>
            <Eye size={16} />
            View
          </Link>
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={orders} empty="No orders yet." />;
}
