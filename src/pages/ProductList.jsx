import React, { useEffect, useState } from 'react'
import { getProducts } from '../api/fakeApi'
import ProductCard from '../components/ProductCard'
import { useLocalProducts } from '../contexts/LocalProductsContext'

export default function ProductList(){
  const [apiProducts, setApiProducts] = useState([])
  const { localProducts } = useLocalProducts()

  useEffect(()=>{
    getProducts().then(r=>setApiProducts(r.data))
  },[])

  const allProducts = [...apiProducts, ...localProducts]

  return (
    <div>
      <h2>Produtos</h2>
      <div className="product-grid">
        {allProducts.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
