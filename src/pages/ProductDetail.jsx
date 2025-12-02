import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../api/fakeApi'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Badge } from 'primereact/badge'
import { Rating } from 'primereact/rating'
import { Skeleton } from 'primereact/skeleton'
import { Toast } from 'primereact/toast'
import { Image } from 'primereact/image'

import { useCart } from '../contexts/CartContext'
import { useLocalProducts } from '../contexts/LocalProductsContext'

export default function ProductDetail() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)

  const { add } = useCart()
  const { localProducts } = useLocalProducts()
  const toast = useRef(null)

  useEffect(() => {
    setLoading(true)

    // 1) Tenta encontrar o produto local (criado pelo admin)
    const local = localProducts.find(p => p.id.toString() === id.toString())

    if (local) {
      setProduct(local)
      setLoading(false)
      return
    }

    // 2) Se não existe local → busca na API
    getProduct(id)
      .then(r => {
        setProduct(r.data)
        setLoading(false)
      })
      .catch(() => {
        setProduct(null)
        setLoading(false)
      })
  }, [id, localProducts])

  const handleAddToCart = () => {
    add(product, qty)
    toast.current.show({
      severity: 'success',
      summary: 'Sucesso!',
      detail: `${product.title} adicionado ao carrinho`,
      life: 3000
    })
  }

  // LOADING
  if (loading) {
    return (
      <div className="px-4 py-6">
        <div className="grid">
          <div className="col-12 md:col-5">
            <Skeleton width="100%" height="400px"></Skeleton>
          </div>
          <div className="col-12 md:col-7">
            <Skeleton width="80%" className="mb-3"></Skeleton>
            <Skeleton width="40%" className="mb-4"></Skeleton>
            <Skeleton width="100%" height="100px" className="mb-4"></Skeleton>
            <Skeleton width="200px" height="50px"></Skeleton>
          </div>
        </div>
      </div>
    )
  }

  // PRODUTO NÃO EXISTE
  if (!product) {
    return (
      <div className="flex justify-content-center align-items-center min-h-30rem">
        <Card className="text-center">
          <i className="pi pi-exclamation-triangle text-4xl text-amber-500 mb-3"></i>
          <h3 className="mb-2">Produto não encontrado</h3>
          <p className="text-gray-600 mb-4">
            O produto que você está procurando não existe ou foi removido.
          </p>
          <Button
            label="Voltar"
            icon="pi pi-arrow-left"
            className="p-button-outlined"
            onClick={() => window.history.back()}
          />
        </Card>
      </div>
    )
  }

  return (
    <>
      <Toast ref={toast} />

      <div className="px-4 py-6">
        <div className="grid">
          {/* IMAGEM PRINCIPAL */}
          <div className="col-12 md:col-5 lg:col-4">
            <Card className="border-1 surface-border p-4">
              <div
                style={{
                  width: '100%',
                  maxWidth: 400,
                  margin: '0 auto',
                  height: 600,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  preview
                  pt={{
                    image: {
                      style: {
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }
                    }
                  }}
                />
              </div>
            </Card>

            {/* MINIATURAS */}
            {product.images && product.images.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-auto">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className="border-1 surface-border border-round p-2 cursor-pointer hover:surface-200 transition-colors"
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-6rem h-6rem object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* INFO DO PRODUTO */}
          <div className="col-12 md:col-7 lg:col-8">
            <div className="flex flex-column gap-4">

              {/* Cabeçalho */}
              <div>
                {product.category && (
                  <Badge
                    value={product.category}
                    severity="info"
                    className="text-xs mb-2"
                  />
                )}

                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {product.title}
                </h1>

                {product.rating && (
                  <div className="flex align-items-center gap-3 mb-3">
                    <Rating
                      value={product.rating.rate}
                      readOnly
                      cancel={false}
                    />
                    <span className="text-gray-600">
                      ({product.rating.count} avaliações)
                    </span>
                  </div>
                )}
              </div>

              {/* Preço */}
              <div className="border-bottom-1 surface-border pb-4">
                <span className="text-3xl font-bold text-amber-600">
                  ${product.price}
                </span>
              </div>

              {/* Descrição */}
              <div className="border-bottom-1 surface-border pb-4">
                <h3 className="text-xl font-bold mb-3">Descrição</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantidade */}
              <div className="flex align-items-center gap-3">
                <label className="font-bold text-lg">Quantidade:</label>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={e => setQty(parseInt(e.target.value))}
                  className="p-inputtext p-component"
                  style={{ width: 80 }}
                />
              </div>

              {/* Botões */}
              <div className="flex flex-wrap gap-3 mt-3">
                <Button
                  label="Adicionar ao Carrinho"
                  icon="pi pi-shopping-cart"
                  className="p-button-raised p-button-lg bg-amber-600"
                  onClick={handleAddToCart}
                />

                <Button
                  label="Comprar Agora"
                  icon="pi pi-bolt"
                  className="p-button-raised p-button-success p-button-lg"
                />

                <Button
                  icon="pi pi-heart"
                  className="p-button-outlined p-button-lg"
                />

                <Button
                  icon="pi pi-share-alt"
                  className="p-button-outlined p-button-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ESPECIFICAÇÕES OPCIONAIS */}
        {product.specifications && (
          <Card className="mt-6">
            <h3 className="text-xl font-bold mb-4">Especificações Técnicas</h3>

            <div className="grid">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="col-12 md:col-6 lg:col-4 mb-3">
                  <div className="font-bold text-gray-600">{key}:</div>
                  <div className="text-gray-800">{value}</div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </>
  )
}
