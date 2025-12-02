import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../api/fakeApi'
import { Button } from 'primereact/button'
import { useCart } from '../contexts/CartContext'
import { useLocalProducts } from '../contexts/LocalProductsContext'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const { add } = useCart()

  const { localProducts } = useLocalProducts()

  useEffect(() => {
    // 1. Tentar encontrar nos produtos locais
    const local = localProducts.find(p => p.id.toString() === id.toString())

    if (local) {
      setProduct(local)
      return
    }

    // 2. Se não achar, buscar na API
    getProduct(id)
      .then(r => setProduct(r.data))
      .catch(() => setProduct(null))
  }, [id, localProducts])

  if (!product) return <div>Carregando...</div>

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16 }}>
      <img
        src={product.image}
        alt=""
        style={{ maxWidth: 300, objectFit: 'contain' }}
      />

      <div>
        <h2>{product.title}</h2>
        <p style={{ fontWeight: 700 }}>${product.price}</p>
        <p>{product.description}</p>

        <div style={{ margin: '1rem 0' }}>
          <label>Quantidade: </label>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={e => setQty(parseInt(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          />
        </div>

        <Button
          label="Adicionar ao carrinho"
          onClick={() => add(product, qty)}
        />
      </div>
    </div>
  )
}
