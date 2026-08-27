import { useCallback, useEffect, useState } from "react";

import { orderService } from "../services/orderService.js";

export default function useOrders() {
  const [orders, setOrders] = useState(() => orderService.getAll());

  const refresh = useCallback(async () => {
    const data = await orderService.refresh();
    setOrders(orderService.getAll());
    return data;
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { orders, refresh };
}
