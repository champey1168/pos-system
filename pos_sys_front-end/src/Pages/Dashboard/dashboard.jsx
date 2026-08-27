import { BarChart3, Coffee, Package, ReceiptText } from "lucide-react";

import { Link } from "react-router-dom";

import { getDashboardStats, getProductSales } from "../../Utils/analytics.js";

import { formatCurrency } from "../../Utils/currency.js";

import useOrders from "../../hooks/useOrders.js";

import useProducts from "../../hooks/useProducts.js";

function Stat({ label, value, icon: Icon }) {
  return (
    <article className="stat-card">
      <span>
        <Icon size={22} />
      </span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

export default function Dashboard() {
  const { orders } = useOrders();

  const { products } = useProducts();

  const stats = getDashboardStats(orders, products);

  const topProducts = getProductSales(orders).slice(0, 5);

  const maxRevenue = Math.max(...topProducts.map((item) => item.revenue), 1);

  const chartPoints = topProducts.map((item, index) => ({
    x: topProducts.length === 1 ? 50 : (index / (topProducts.length - 1)) * 100,
    y: 100 - Math.max((item.revenue / maxRevenue) * 100, 4),
    item,
  }));
  return (
    <section className="stack">
      <div className="stats-grid">
        <Stat
          icon={Coffee}
          label="Today's Sales"
          value={formatCurrency(stats.todaysSales)}
        />
        <Stat
          icon={ReceiptText}
          label="Today's Orders"
          value={stats.todaysOrders}
        />
        <Stat icon={Package} label="Products Sold" value={stats.productsSold} />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="section-head tight">
            <div>
              <h2>Revenue</h2>
              <p>
                Total revenue {formatCurrency(stats.totalRevenue)} / average
                order {formatCurrency(stats.averageOrder)}
              </p>
            </div>
            <BarChart3 size={22} />
          </div>

          <div className="revenue-chart">
            {chartPoints.length ? (
              <>
                <div className="revenue-chart-area">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#16a34a" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polygon
                      fill="url(#revenueGradient)"
                      points={`0,100 ${chartPoints.map(({ x, y }) => `${x},${y}`).join(" ")} 100,100`}
                    />
                    <polyline
                      className="revenue-line"
                      points={chartPoints
                        .map(({ x, y }) => `${x},${y}`)
                        .join(" ")}
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  {chartPoints.map(({ x, y, item }) => (
                    <div
                      key={item.productId}
                      className="revenue-dot"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <span className="revenue-tooltip">
                        {formatCurrency(item.revenue)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="revenue-labels">
                  {chartPoints.map(({ item }) => (
                    <span key={item.productId} title={item.product}>
                      {item.product}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className="empty-state small">
                <strong>No sales yet.</strong>
                <span>Complete checkout to populate charts.</span>
              </div>
            )}
          </div>
        </section>

        <section className="panel">
          <div className="section-head tight">
            <div>
              <h2>Top Products</h2>
              <p>Calculated from completed orders.</p>
            </div>
            <Link to="/reports/products">View report</Link>
          </div>

          <div className="rank-list">
            {topProducts.length ? (
              topProducts.map((item) => (
                <div key={item.productId}>
                  <span>
                    {item.product}
                    <small>{item.units} units</small>
                  </span>
                  <strong>{formatCurrency(item.revenue)}</strong>
                </div>
              ))
            ) : (
              <p className="muted">No product sales yet.</p>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
