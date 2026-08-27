import { api } from "./api.js";

let cache = [];

function snapshot() {
  return cache;
}

function normalizeItem(item) {
  return {
    id: item.id,
    productId: item.product_id ?? item.productId,
    name: item.name,
    price: Number(item.price),
    quantity: Number(item.quantity),
    image: item.image,
    remarks: item.remarks,
  };
}

function normalizeOrder(order) {
  return {
    ...order,
    id: order.id,
    createdAt: order.created_at || order.createdAt,
    paymentMethod: order.payment_method || order.paymentMethod,
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    total: Number(order.total),
    items: (order.items || []).map(normalizeItem),
  };
}

export const orderService = {
  getAll() {
    return snapshot();
  },

  getById(id) {
    return snapshot().find((order) => `${order.id}` === `${id}`);
  },

  async refresh() {
    try {
      const data = await api.get("/orders");
      cache = data.map(normalizeOrder);
    } catch {
      // keep cache
    }
    return snapshot();
  },

  async create(order) {
    const created = await api.post("/orders", {
      items: order.items.map((item) => ({
        productId: item.productId ?? item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        remarks: item.remarks,
      })),
      subtotal: order.subtotal,
      discount: order.discount,
      total: order.total,
      paymentMethod: order.paymentMethod || "Cash",
      amountReceived: order.amountReceived ?? order.total,
      change: order.change ?? 0,
      status: order.status || "Completed",
    });
    const normalized = normalizeOrder(created);
    cache = [normalized, ...snapshot()];
    return normalized;
  },

  async updateStatus(id, status) {
    const updated = await api.patch(`/orders/${id}/status`, { status });
    const normalized = normalizeOrder(updated);
    cache = snapshot().map((o) => (`${o.id}` === `${id}` ? normalized : o));
    return normalized;
  },

  async remove(id) {
    await api.delete(`/orders/${id}`);
    cache = snapshot().filter((o) => `${o.id}` !== `${id}`);
  },
};
