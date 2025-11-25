import React from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function ProductCard({ product }) {
  const { add } = useCart()

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

  const footer = (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Link to={`/products/${product.id}`} style={{ width: '100%' }}>
        <Button label="Ver" className="p-button-outlined" style={{ width: '100%' }} />
      </Link>

      <Button 
        label="Adicionar" 
        onClick={() => add(product)} 
        style={{ width: '100%' }} 
      />
    </div>
  )

  return (
    <Card header={header} className="product-card">
      <div className="card-body">
        <h4 className="card-title">{product.title}</h4>
        <p className="card-price">${product.price}</p>

        <div className="card-footer">
          <Link to={`/products/${product.id}`} style={{ width: "100%" }}>
            <Button label="Ver" className="p-button-outlined" style={{ width: "100%" }} />
          </Link>
          <Button label="Adicionar" onClick={() => add(product)} style={{ width: "100%" }} />
        </div>
      </div>
    </Card>
  )
}
