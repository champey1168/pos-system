import { useContext } from 'react'

import { CartContext } from '../context/cartContext.js'

export default function useCart() {
  const value = useContext(CartContext)

  if (!value) throw new Error('useCart must be used inside CartProvider')

  return value
}
