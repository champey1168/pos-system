import * as Icons from "lucide-react";

export default function ProductFilter({
  categories,
  category,
  onCategoryChange,
}) {
  return (
    <div className="category-bar">
      {categories.map((cat) => {
        const Icon = Icons[cat.icon];
        const active = category === cat.name;
        return (
          <button
            key={cat.id}
            type="button"
            className={`category-chip${active ? " active" : ""}`}
            onClick={() => onCategoryChange(cat.name)}
          >
            {Icon && <Icon size={17} />}
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
