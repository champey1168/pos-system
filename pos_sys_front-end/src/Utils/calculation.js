export function calculateSubtotal(items = []) {
  return items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );
}

export function calculateDiscount(subtotal = 0, discount = 0) {
  const value = Number(discount) || 0;

  return Math.min(Math.max(value, 0), Number(subtotal) || 0);
}

export function calculateTotal(subtotal = 0, discount = 0) {
  return Math.max(
    (Number(subtotal) || 0) - calculateDiscount(subtotal, discount),
    0,
  );
}
