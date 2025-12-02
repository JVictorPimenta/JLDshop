import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../api/fakeApi'
import { Button } from 'primereact/button'
import { useCart } from '../contexts/CartContext'
import { Card } from 'primereact/card'
import { Badge } from 'primereact/badge'
import { Rating } from 'primereact/rating'
import { Skeleton } from 'primereact/skeleton'
import { Toast } from 'primereact/toast'
import { Image } from 'primereact/image';
import { useRef } from 'react'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { add } = useCart()
  const toast = useRef(null)

  useEffect(() => {
    setLoading(true)
    getProduct(id)
      .then(r => {
        setProduct(r.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    add(product)
    toast.current.show({
      severity: 'success',
      summary: 'Sucesso!',
      detail: `${product.title} adicionado ao carrinho`,
      life: 3000
    })
  }

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

  if (!product) {
    return (
      <div className="flex justify-content-center align-items-center min-h-30rem">
        <Card className="text-center">
          <i className="pi pi-exclamation-triangle text-4xl text-amber-500 mb-3"></i>
          <h3 className="mb-2">Produto não encontrado</h3>
          <p className="text-gray-600 mb-4">O produto que você está procurando não existe ou foi removido.</p>
          <Button 
            label="Voltar para Produtos" 
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
          {/* Image Section */}
          <div className="col-12 md:col-5 lg:col-4">
          <Card className="border-1 surface-border p-4">
            <div
              style={{
                width: '100%',
                maxWidth: 400,
                margin: '0 auto',
                height: 600, // << FIXED HEIGHT
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
                      objectFit: 'contain' // stays contained inside fixed height
                    }
                  }
                }}
              />
            </div>
          </Card>

            {/* Thumbnails (if available) */}
            {product.images && product.images.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-auto">
                {product.images.map((img, index) => (
                  <div 
                    key={index} 
                    className="border-1 surface-border border-round p-2 cursor-pointer hover:surface-200 transition-colors transition-duration-150"
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

          {/* Product Info Section */}
          <div className="col-12 md:col-7 lg:col-8">
            <div className="flex flex-column gap-4">
              {/* Header */}
              <div>
                <div className="flex align-items-center gap-3 mb-2">
                  {product.category && (
                    <Badge 
                      value={product.category} 
                      severity="info" 
                      className="text-xs"
                    />
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                  {product.title}
                </h1>
                
                <div className="flex align-items-center gap-3 mb-3">
                  {product.rating && (
                    <>
                      <Rating 
                        value={product.rating.rate} 
                        readOnly 
                        cancel={false} 
                        className="text-amber-500"
                      />
                      <span className="text-gray-600">
                        ({product.rating.count} avaliações)
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="border-bottom-1 surface-border pb-4">
                <div className="flex align-items-end gap-3">
                  <span className="text-3xl font-bold text-amber-600">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discount && (
                    <Badge 
                      value={`-${product.discount}%`} 
                      severity="success" 
                      className="text-sm"
                    />
                  )}
                </div>
                
                {/* Stock Status - Always showing as available */}
                <div className="mt-3">
                  <div className="flex align-items-center gap-2">
                    <i className="pi pi-check-circle text-green-500"></i>
                    <span className="text-green-600 font-medium">
                      Disponível para compra
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-bottom-1 surface-border pb-4">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Descrição</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {product.description}
                </p>
                
                {/* Additional Details */}
                {product.features && (
                  <div className="mt-4">
                    <h4 className="font-bold mb-2 text-gray-800">Características</h4>
                    <ul className="list-none p-0 m-0">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex align-items-center gap-2 mb-2">
                          <i className="pi pi-check text-green-500"></i>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Actions - Buttons are always enabled */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  label="Adicionar ao Carrinho" 
                  icon="pi pi-shopping-cart" 
                  className="p-button-raised p-button-lg bg-amber-600 border-amber-600 hover:bg-amber-700"
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
                  tooltip="Adicionar à lista de desejos"
                  tooltipOptions={{ position: 'top' }}
                />
                
                <Button 
                  icon="pi pi-share-alt" 
                  className="p-button-outlined p-button-lg"
                  tooltip="Compartilhar"
                  tooltipOptions={{ position: 'top' }}
                />
              </div>

              {/* Additional Info */}
              <div className="grid mt-4">
                <div className="col-6 md:col-3">
                  <div className="text-center p-3 border-1 surface-border border-round">
                    <i className="pi pi-truck text-2xl text-amber-500 mb-2"></i>
                    <p className="font-bold mb-1">Entrega Grátis</p>
                    <p className="text-sm text-gray-600">Acima de $50</p>
                  </div>
                </div>
                <div className="col-6 md:col-3">
                  <div className="text-center p-3 border-1 surface-border border-round">
                    <i className="pi pi-sync text-2xl text-amber-500 mb-2"></i>
                    <p className="font-bold mb-1">Devolução</p>
                    <p className="text-sm text-gray-600">30 dias</p>
                  </div>
                </div>
                <div className="col-6 md:col-3">
                  <div className="text-center p-3 border-1 surface-border border-round">
                    <i className="pi pi-shield text-2xl text-amber-500 mb-2"></i>
                    <p className="font-bold mb-1">Garantia</p>
                    <p className="text-sm text-gray-600">1 ano</p>
                  </div>
                </div>
                <div className="col-6 md:col-3">
                  <div className="text-center p-3 border-1 surface-border border-round">
                    <i className="pi pi-headphones text-2xl text-amber-500 mb-2"></i>
                    <p className="font-bold mb-1">Suporte</p>
                    <p className="text-sm text-gray-600">24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Additional Info (Optional) */}
        {product.specifications && (
          <Card className="mt-6">
            <div className="border-bottom-1 surface-border mb-4">
              <h3 className="text-xl font-bold text-gray-800">Especificações Técnicas</h3>
            </div>
            <div className="grid">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div key={index} className="col-12 md:col-6 lg:col-4 mb-3">
                  <div className="font-bold text-gray-600 mb-1">{key}:</div>
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