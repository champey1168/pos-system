const statuses = ["Pending", "Completed", "Cancelled", "Refunded"];

export default function OrderStatus({ value, onChange }) {
  if (!onChange)
    return (
      <span className={`status status-${String(value).toLowerCase()}`}>
        {value}
      </span>
    );

  return (
    <select
      className={`status-select status-${String(value).toLowerCase()}`}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {statuses.map((status) => (
        <option key={status}>{status}</option>
      ))}
    </select>
  );
}
