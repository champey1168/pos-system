import { Link } from "react-router-dom";

import { BarChart3, Package } from "lucide-react";

export default function Reports() {
  const cards = [
    {
      to: "/reports/sales",
      title: "Sales Report",
      text: "Revenue, total orders, and average order value.",
      icon: BarChart3,
    },
    {
      to: "/reports/products",
      title: "Product Report",
      text: "Units sold and revenue by menu item.",
      icon: Package,
    },
  ];

  return (
    <section className="card-grid">
      {cards.map(({ to, title, text, icon: Icon }) => (
        <Link className="nav-card" to={to} key={to}>
          <Icon size={28} />
          <strong>{title}</strong>
          <span>{text}</span>
        </Link>
      ))}
    </section>
  );
}
