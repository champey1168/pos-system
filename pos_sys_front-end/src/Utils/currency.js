import { settingsService } from "../services/settingsService.js";

export function formatCurrency(value = 0, currency) {
  const code = currency || settingsService.get().currency || "USD";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      minimumFractionDigits: 2,
    }).format(Number(value) || 0);
  } catch {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(Number(value) || 0);
  }
}
