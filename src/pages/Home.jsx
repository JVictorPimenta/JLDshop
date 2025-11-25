import React, { useEffect, useState } from 'react'
import { getProducts } from '../api/fakeApi'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

export default function Home(){
  const [products, setProducts] = useState([])
  useEffect(()=> {
    getProducts(6).then(r=>setProducts(r.data)).catch(()=>{})
  },[])
  return (
    <div>
      <h2>Bem-vindo ao E-Shop MVP</h2>
      <p>Protótipo minimalista que consome FakeStoreAPI.</p>
      <h3>Produtos em destaque</h3>
      <div className="product-grid">
        {products.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
      <div style={{marginTop:16}}>
        <Link to="/products">Ver todos os produtos</Link>
      </div>
    </div>
  )
}
