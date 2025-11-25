import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()
export const useCart = () => useContext(CartContext)

export function CartProvider({children}){
  const [items, setItems] = useState([])

  // só adiciona um produto por vez
  const add = (product, qty= 1) => {
    setItems(prev => {
      const found = prev.find(p => p.id === product.id)  //produtos - p, qty - quantidade
      if(found) return prev.map(p => p.id===product.id ? {...p, qty: p.qty + qty} : p)
      return [...prev, {...product, qty}]
    })
  }
  const remove = (id) => setItems(prev => prev.filter(p=>p.id!==id))
  const clear = () => setItems([])

  return <CartContext.Provider value={{items, add, remove, clear}}>{children}</CartContext.Provider>
}
