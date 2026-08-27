import { getProductSales } from "../../Utils/analytics.js";

import { formatCurrency } from "../../Utils/currency.js";

import Table from "../../components/Common/Table.jsx";

import useOrders from "../../hooks/useOrders.js";

export default function ProductReport() {
  const { orders } = useOrders();

  const rows = getProductSales(orders);

  const columns = [
    { key: "product", header: "Product" },
    { key: "units", header: "Units Sold" },
    {
      key: "revenue",
      header: "Revenue",
      render: (row) => formatCurrency(row.revenue),
    },
  ];

  return (
    <section className="stack">
      <div className="section-head">
        <div>
          <h2>Product Report</h2>
          <p>Best-selling products sorted by units sold.</p>
        </div>
      </div>
      <Table
        columns={columns}
        data={rows}
        rowKey="productId"
        empty="No product sales yet."
      />
    </section>
  );
}
