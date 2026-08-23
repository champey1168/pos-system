export function validateProduct(product) {
  const errors = {};

  if (!product.name?.trim()) errors.name = "Product name is required.";
  if (!product.category) errors.category = "Category is required.";

  if (!(Number(product.price) > 0))
    errors.price = "Price must be greater than 0.";

  if (!(Number(product.cost) >= 0)) errors.cost = "Cost must be 0 or greater.";
  if (!(Number(product.stock) >= 0))
    errors.stock = "Stock must be 0 or greater.";

  return errors;
}

export function validateSettings(settings) {
  const errors = {};
  if (!settings.storeName?.trim()) errors.storeName = "Store name is required.";

  if (!settings.currency) errors.currency = "Currency is required.";
  return errors;
}
