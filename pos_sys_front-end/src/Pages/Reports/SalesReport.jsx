import { useMemo, useState } from "react";

import { getSalesForRange } from "../../Utils/analytics.js";

import { formatCurrency } from "../../Utils/currency.js";

import Table from "../../components/Common/Table.jsx";

import useOrders from "../../hooks/useOrders.js";

export default function SalesReport() {
  const [range, setRange] = useState("month");

  const { orders: allOrders } = useOrders();

  const orders = useMemo(
    () => getSalesForRange(allOrders, range),
    [allOrders, range],
  );

  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  const columns = [
    { key: "id", header: "Order" },
    {
      key: "createdAt",
      header: "Date",
      render: (order) => new Date(order.createdAt).toLocaleDateString(),
    },
    {
      key: "total",
      header: "Total",
      render: (order) => formatCurrency(order.total),
    },
    { key: "paymentMethod", header: "Payment" },
  ];

  return (
    <section className="stack">
      <div className="section-head">
        <div>
          <h2>Sales Report</h2>
          <p>Revenue is calculated from completed orders.</p>
        </div>
        <select
          className="input compact"
          value={range}
          onChange={(event) => setRange(event.target.value)}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="all">All Time</option>
        </select>
      </div>
      <div className="stats-grid">
        <article className="stat-card">
          <div>
            <p>Total Revenue</p>
            <strong>{formatCurrency(revenue)}</strong>
          </div>
        </article>
        <article className="stat-card">
          <div>
            <p>Total Orders</p>
            <strong>{orders.length}</strong>
          </div>
        </article>
        <article className="stat-card">
          <div>
            <p>Average Order</p>
            <strong>
              {formatCurrency(orders.length ? revenue / orders.length : 0)}
            </strong>
          </div>
        </article>
      </div>
      <Table columns={columns} data={orders} empty="No sales in this range." />
    </section>
  );
}
