import React, { useState } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function ProductCard({ product }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)

  const header = (
    <img
      src={product.image}
      alt={product.title}
      style={{
        width: '100%',
        height: 180,
        objectFit: 'contain',
        padding: '1rem'
      }}
    />
  )

  return (
    <Card header={header} className="product-card">
      <div className="card-body">
        <h4 className="card-title">{product.title}</h4>
        <p className="card-price">${product.price}</p>

        <div style={{ marginBottom: '0.5rem' }}>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={e => setQty(parseInt(e.target.value))}
            style={{ width:60 }}
          />
        </div>

        <div className="card-footer" style={{ display:'flex', gap:'0.5rem' }}>
          <Link to={`/products/${product.id}`} style={{ width: "100%" }}>
            <Button 
              label="Ver" 
              className="p-button-outlined" 
              style={{ width: "100%" }} 
            />
          </Link>

          <Button 
            label="Adicionar"
            onClick={() => add(product, qty)}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </Card>
  )
}