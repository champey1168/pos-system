export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {Icon ? <Icon size={18} aria-hidden="true" /> : null}

      <span>{children}</span>
    </button>
  );
}
