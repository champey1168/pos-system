import { useMemo, useState } from "react";

import {
  calculateDiscount,
  calculateSubtotal,
  calculateTotal,
} from "../Utils/calculation.js";

import { readStorage, writeStorage } from "../Utils/storage.js";

import { CartContext } from "./cartContext.js";

const CART_KEY = "coffee_pos_cart";

function itemKey(product, options) {
  return [
    product.id,
    options.size,
    options.sugar,
    options.remarks?.trim().toLowerCase(),
  ].join("|");
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStorage(CART_KEY, []));

  const [discount, setDiscountState] = useState(0);

  const persist = (next) => {
    setItems(next);
    writeStorage(CART_KEY, next);
  };

  const subtotal = calculateSubtotal(items);

  const discountAmount = calculateDiscount(subtotal, discount);

  const total = calculateTotal(subtotal, discount);

  const value = useMemo(
    () => ({
      items,

      discount,

      setDiscount(value) {
        setDiscountState(Number(value) || 0);
      },

      subtotal,
      discountAmount,
      total,

      addToCart(product, options = {}) {
        const quantity = Number(options.quantity) || 1;

        const sizeDelta =
          options.size === "Large" ? 0.5 : options.size === "Small" ? -0.2 : 0;

        const price = Math.max(Number(product.price) + sizeDelta, 0);

        const key = itemKey(product, options);

        const existing = items.find((item) => item.key === key);

        const next = existing
          ? items.map((item) =>
              item.key === key
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            )
          : [
              ...items,
              {
                key,
                productId: product.id,
                name: product.name,
                category: product.category,
                image: product.image,
                price,
                quantity,
                size: options.size || "Medium",
                sugar: options.sugar ?? 50,
                remarks: options.remarks?.trim() || "",
              },
            ];

        persist(next);
      },

      removeFromCart(key) {
        persist(items.filter((item) => item.key !== key));
      },

      updateQuantity(key, quantity) {
        persist(
          items
            .map((item) =>
              item.key === key
                ? { ...item, quantity: Math.max(Number(quantity) || 0, 0) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },

      increaseQuantity(key) {
        persist(
          items.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        );
      },

      decreaseQuantity(key) {
        persist(
          items
            .map((item) =>
              item.key === key
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },

      clearCart() {
        setDiscountState(0);
        persist([]);
      },
    }),
    [discount, discountAmount, items, subtotal, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
