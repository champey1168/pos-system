import { readStorage, writeStorage } from "../Utils/storage.js";

const KEY = "coffee_pos_orders";

export const orderService = {
  getAll() {
    return readStorage(KEY, []);
  },

  getById(id) {
    return this.getAll().find((order) => order.id === id);
  },

  create(order) {
    const created = {
      ...order,

      id:
        order.id ||
        `ORD-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${String(Date.now()).slice(-5)}`,

      createdAt: order.createdAt || new Date().toISOString(),

      status: order.status || "Completed",
    };

    writeStorage(KEY, [created, ...this.getAll()]);

    return created;
  },

  updateStatus(id, status) {
    let updatedOrder;
    const orders = this.getAll().map((order) => {
      if (order.id !== id) return order;

      updatedOrder = { ...order, status };
      return updatedOrder;
    });

    writeStorage(KEY, orders);

    return updatedOrder;
  },

  remove(id) {
    writeStorage(
      KEY,
      this.getAll().filter((order) => order.id !== id),
    );
  },
};
