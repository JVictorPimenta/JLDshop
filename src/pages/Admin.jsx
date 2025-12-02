import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Card } from 'primereact/card'
import { Toolbar } from 'primereact/toolbar'
import { DataView } from 'primereact/dataview'
import { Tag } from 'primereact/tag'
import { Badge } from 'primereact/badge'
import { getProducts } from '../api/fakeApi'
import { useLocalProducts } from '../contexts/LocalProductsContext'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import './Admin.css' // We'll create this CSS file

export default function Admin() {
  const { localProducts, addProduct, removeProduct } = useLocalProducts()
  const [apiProducts, setApiProducts] = useState([])

  // Modal
  const [showModal, setShowModal] = useState(false)

  // Campos do produto
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(null)
  const [image, setImage] = useState("")

  useEffect(() => {
    getProducts().then(r => setApiProducts(r.data))
  }, [])

  function handleAdd() {
    if (!title || !price) {
      alert("Preencha os campos obrigatórios.")
      return
    }

    const newProduct = {
      id: Date.now(),
      title,
      price: Number(price),
      image: image || "https://via.placeholder.com/300"
    }

    addProduct(newProduct)

    setTitle("")
    setPrice(null)
    setImage("")
    setShowModal(false)
  }

  const leftToolbarTemplate = () => (
    <div className="flex align-items-center gap-3">
      <h2 className="m-0 text-blue-700">
        <i className="pi pi-cog mr-2"></i>
        Admin Dashboard
      </h2>
      <Badge value={`${apiProducts.length + localProducts.length} produtos`} severity="info"></Badge>
    </div>
  )

  const rightToolbarTemplate = () => (
    <Button 
      label="Adicionar Produto" 
      icon="pi pi-plus-circle" 
      onClick={() => setShowModal(true)} 
      className="p-button-info"
      raised
    />
  )

  const productItemTemplate = (product) => {
    const isLocal = localProducts.some(lp => lp.id === product.id)
    
    return (
      <Card className="mb-4 shadow-2 border-blue-100">
        <div className="flex flex-column md:flex-row align-items-center md:align-items-start gap-4">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-10rem h-10rem object-cover border-round border-2 border-blue-100"
          />
          
          <div className="flex-1">
            <div className="flex justify-content-between align-items-start mb-2">
              <h3 className="text-blue-800 m-0">{product.title}</h3>
              {isLocal ? (
                <Tag value="Local" severity="info" icon="pi pi-database"></Tag>
              ) : (
                <Tag value="API" severity="warning" icon="pi pi-cloud"></Tag>
              )}
            </div>
            
            <div className="mb-3">
              <span className="text-2xl font-bold text-blue-600">
                R$ {product.price.toFixed(2)}
              </span>
            </div>
            
            <p className="text-blue-700 mb-4">ID: {product.id}</p>
            
            {isLocal && (
              <Button 
                label="Excluir" 
                icon="pi pi-trash" 
                className="p-button-outlined p-button-danger"
                onClick={() => removeProduct(product.id)}
              />
            )}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="admin-container p-4">
      {/* TOOLBAR */}
      <Toolbar 
        className="mb-4 border-blue-200"
        left={leftToolbarTemplate} 
        right={rightToolbarTemplate}
      />

      {/* MODAL */}
      <Dialog 
        header={
          <div className="flex align-items-center gap-2 text-blue-700">
            <i className="pi pi-plus-circle"></i>
            <span>Adicionar Produto</span>
          </div>
        } 
        visible={showModal} 
        style={{ width: '450px' }}
        onHide={() => setShowModal(false)}
        draggable={false}
        className="shadow-5"
      >
        <div className="p-fluid" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="field">
            <span className="p-float-label">
              <InputText 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full"
              />
              <label htmlFor="title" className="text-blue-600">
                <i className="pi pi-tag mr-2"></i>
                Título *
              </label>
            </span>
          </div>

          <div className="field">
            <span className="p-float-label">
              <InputNumber 
                id="price" 
                value={price} 
                onValueChange={(e) => setPrice(e.value)} 
                mode="currency" 
                currency="BRL"
                locale="pt-BR"
                className="w-full"
              />
              <label htmlFor="price" className="text-blue-600">
                <i className="pi pi-money-bill mr-2"></i>
                Preço *
              </label>
            </span>
          </div>

          <div className="field">
            <span className="p-float-label">
              <InputText 
                id="image" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                className="w-full"
              />
              <label htmlFor="image" className="text-blue-600">
                <i className="pi pi-image mr-2"></i>
                URL da imagem (opcional)
              </label>
            </span>
          </div>

          <div className="flex gap-2 justify-content-end mt-4">
            <Button 
              label="Cancelar" 
              icon="pi pi-times" 
              className="p-button-outlined p-button-secondary"
              onClick={() => setShowModal(false)}
            />
            <Button 
              label="Adicionar" 
              icon="pi pi-check" 
              onClick={handleAdd} 
              className="p-button-info"
              raised
            />
          </div>
        </div>
      </Dialog>

      {/* PRODUCTS LIST */}
      <Card className="border-blue-100">
        <div className="mb-4">
          <h3 className="text-blue-700 m-0">
            <i className="pi pi-shopping-bag mr-2"></i>
            Lista de Produtos
            <span className="ml-3 text-sm text-blue-500 font-normal">
              ({apiProducts.length} da API + {localProducts.length} locais)
            </span>
          </h3>
        </div>

        <DataView
          value={[...apiProducts, ...localProducts]}
          itemTemplate={productItemTemplate}
          paginator
          rows={5}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} produtos"
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Card>
    </div>
  )
}