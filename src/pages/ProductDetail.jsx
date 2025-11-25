import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../api/fakeApi'
import { Button } from 'primereact/button'
import { useCart } from '../contexts/CartContext'

export default function ProductDetail(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { add } = useCart()

  useEffect(()=> {
    getProduct(id).then(r=>setProduct(r.data)).catch(()=>{})
  },[id])

  if(!product) return <div>Carregando...</div>
  return (
    <div style={{display:'grid',gridTemplateColumns:'320px 1fr',gap:16}}>
      <img src={product.image} alt="" style={{maxWidth:300, objectFit:'contain'}} />
      <div>
        <h2>{product.title}</h2>
        <p style={{fontWeight:700}}>${product.price}</p>
        <p>{product.description}</p>
        <Button label="Adicionar ao carrinho" onClick={()=>add(product)} />
      </div>
    </div>
  )
}
