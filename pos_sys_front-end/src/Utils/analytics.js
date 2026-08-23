function isSameDay(date, target = new Date()) {
  const value = new Date(date);

  return value.toDateString() === target.toDateString();
}

function isWithinDays(date, days) {
  const value = new Date(date).getTime();

  return value >= Date.now() - days * 24 * 60 * 60 * 1000;
}

export function completedOrders(orders = []) {
  return orders.filter((order) => order.status === "Completed");
}

export function getDashboardStats(orders = [], products = []) {
  const completed = completedOrders(orders);

  const todaysOrders = orders.filter((order) => isSameDay(order.createdAt));

  const todaysCompleted = completed.filter((order) =>
    isSameDay(order.createdAt),
  );

  const productsSold = todaysCompleted.reduce(
    (sum, order) =>
      sum + order.items.reduce((total, item) => total + item.quantity, 0),
    0,
  );
  return {
    todaysSales: todaysCompleted.reduce((sum, order) => sum + order.total, 0),

    todaysOrders: todaysOrders.length,

    productsSold,

    totalRevenue: completed.reduce((sum, order) => sum + order.total, 0),

    averageOrder: completed.length
      ? completed.reduce((sum, order) => sum + order.total, 0) /
        completed.length
      : 0,

    activeProducts: products.filter((product) => product.status === "Active")
      .length,
  };
}

export function getProductSales(orders = []) {
  const map = new Map();

  completedOrders(orders).forEach((order) => {
    order.items.forEach((item) => {
      const current = map.get(item.productId) || {
        productId: item.productId,
        product: item.name,
        units: 0,
        revenue: 0,
      };

      current.units += item.quantity;

      current.revenue += item.price * item.quantity;

      map.set(item.productId, current);
    });
  });

  return [...map.values()].sort((a, b) => b.units - a.units);
}

export function getSalesForRange(orders = [], range = "month") {
  const completed = completedOrders(orders);

  if (range === "today")
    return completed.filter((order) => isSameDay(order.createdAt));

  if (range === "week")
    return completed.filter((order) => isWithinDays(order.createdAt, 7));

  if (range === "month")
    return completed.filter((order) => isWithinDays(order.createdAt, 30));

  return completed;
}
