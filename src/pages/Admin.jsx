import React, { useEffect, useState } from 'react'
import { getProducts } from '../api/fakeApi'
import { useLocalProducts } from '../contexts/LocalProductsContext'

export default function Admin(){
  const { localProducts, addProduct, removeProduct } = useLocalProducts()
  const [apiProducts, setApiProducts] = useState([])

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("") // URL da imagem ou Base64

  useEffect(()=>{
    getProducts().then(r=>setApiProducts(r.data))
  },[])

  function handleAdd(){
    const newProduct = {
      id: Date.now(),
      title,
      price: Number(price),
      image: image || "https://via.placeholder.com/300"
    }

    addProduct(newProduct)

    setTitle("")
    setPrice("")
    setImage("")
  }

  return (
    <div>
      <h2>Admin — Produtos</h2>

      <h3>Adicionar Produto</h3>
      <input placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
      <input placeholder="Preço" value={price} onChange={e=>setPrice(e.target.value)} />
      <input placeholder="URL da imagem" value={image} onChange={e=>setImage(e.target.value)} />

      <button onClick={handleAdd}>Adicionar</button>

      <h3>Produtos (API + Locais)</h3>
      <div className="product-grid">
        {[...apiProducts, ...localProducts].map(p=>(
          <div key={p.id}>
            <img src={p.image} width={120} />
            <h4>{p.title}</h4>
            <p>R$ {p.price}</p>

            {localProducts.some(lp=>lp.id === p.id) && (
              <button onClick={() => removeProduct(p.id)}>Remover</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
