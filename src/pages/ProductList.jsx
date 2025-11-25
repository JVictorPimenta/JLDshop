import React, { useEffect, useState } from 'react'
import { getProducts } from '../api/fakeApi'
import ProductCard from '../components/ProductCard'

export default function ProductList(){
  const [products, setProducts] = useState([])
  useEffect(()=> {
    getProducts().then(r=>setProducts(r.data)).catch(()=>{})
  },[])
  return (
    <div>
      <h2>Produtos</h2>
      <div className="product-grid">
        {products.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
