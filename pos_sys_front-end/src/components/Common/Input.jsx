export default function Input({ label, error, className = "", id, ...props }) {
  const inputId = id || props.name;
  return (
    <label className={`field ${className}`} htmlFor={inputId}>
      {label ? <span>{label}</span> : null}

      <input id={inputId} className={error ? "input has-error" : "input"} {...props} />

      {error ? <small className="field-error">{error}</small> : null}
    </label>
  );
}
