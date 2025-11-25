import React, { useEffect, useState } from 'react'
import { getProducts } from '../api/fakeApi'
import { useAuth } from '../contexts/AuthContext'
import ProductCard from '../components/ProductCard'

/*
 Admin area is a simulated CRUD:
 - Read products from FakeStoreAPI
 - Create/Update/Delete are simulated locally (not persisted to fakestoreapi)
 This keeps the demo safe and predictable.
*/

export default function Admin(){
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [localChanges, setLocalChanges] = useState([])

  useEffect(()=> {
    if(!user || !user.isAdmin) return
    getProducts().then(r=>setProducts(r.data)).catch(()=>{})
  },[user])

  if(!user) return <div>É necessário login.</div>
  if(!user.isAdmin) return <div>Área restrita a administradores.</div>

  return (
    <div>
      <h2>Admin — Gerenciar Produtos (simulado)</h2>
      <p>Leitura em tempo real da FakeStoreAPI. Alterações de criação/edição/exclusão são simuladas localmente no navegador.</p>
      <div className="product-grid" style={{marginTop:12}}>
        {products.map(p=> <div key={p.id} className="card"><h4>{p.title}</h4><p>${p.price}</p></div>)}
      </div>
    </div>
  )
}
