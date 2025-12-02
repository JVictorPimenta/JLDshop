import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()
export const useCart = () => useContext(CartContext)

export function CartProvider({ children }) {

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cart")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const MAX_ITEMS = 500

const add = (product, qty = 1) => {
  setItems(prev => {
    const total = prev.reduce((sum, item) => sum + item.qty, 0)

    // se já bateu o limite, não adiciona
    if (total + qty > MAX_ITEMS) {
      alert(`Limite máximo de ${MAX_ITEMS} itens atingido.`)
      return prev
    }

    const found = prev.find(p => p.id === product.id)
    if (found) {
      return prev.map(p => 
        p.id === product.id 
          ? { ...p, qty: p.qty + qty }
          : p
      )
    }

    return [...prev, { ...product, qty }]
  })
}

  const remove = (id) => {
    setItems(prev => prev.filter(p => p.id !== id))
  }

  const clear = () => setItems([])

  return (
    <CartContext.Provider value={{ items, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  )
}