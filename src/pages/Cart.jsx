import React from 'react'
import { useCart } from '../contexts/CartContext'
import { Button } from 'primereact/button'

export default function Cart(){
  const { items, remove, clear } = useCart()
  const total = items.reduce((s,i)=> s + i.price * i.qty, 0).toFixed(2)
  return (
    <div>
      <h2>Carrinho</h2>
      {items.length===0 ? <p>Carrinho vazio</p> : (
        <div>
          <ul>
            {items.map(i=> <li key={i.id} style={{marginBottom:8}}>
              {i.title} — {i.qty} x ${i.price}
              <Button onClick={()=>remove(i.id)} style={{marginLeft:8}} label="Remover" />
            </li>)}
          </ul>
          <p><strong>Total:</strong> ${total}</p>
          <Button label="Esvaziar" onClick={clear} />
        </div>
      )}
    </div>
  )
}
