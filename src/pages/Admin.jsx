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
import { Toast } from 'primereact/toast'
import { getProducts } from '../api/fakeApi'
import { useLocalProducts } from '../contexts/LocalProductsContext'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import './Admin.css'

export default function Admin() {
  const { localProducts, addProduct, removeProduct, updateProduct } = useLocalProducts()
  const [apiProducts, setApiProducts] = useState([])
  const toast = React.useRef(null)

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  // Campos do produto
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(null)
  const [image, setImage] = useState("")

  useEffect(() => {
    getProducts().then(r => setApiProducts(r.data))
  }, [])

  function handleAdd() {
    if (!title || !price) {
      showToast('error', 'Erro', 'Preencha os campos obrigatórios.')
      return
    }

    const newProduct = {
      id: Date.now(),
      title,
      price: Number(price),
      image: image || "https://via.placeholder.com/300"
    }

    addProduct(newProduct)
    
    showToast('success', 'Sucesso', 'Produto adicionado com sucesso!')
    resetForm()
    setShowAddModal(false)
  }

  function handleEdit() {
    if (!title || !price) {
      showToast('error', 'Erro', 'Preencha os campos obrigatórios.')
      return
    }

    const updatedProduct = {
      title,
      price: Number(price),
      image: image || "https://via.placeholder.com/300"
    }

    updateProduct(editingProduct.id, updatedProduct)
    
    showToast('success', 'Sucesso', 'Produto atualizado com sucesso!')
    resetForm()
    setShowEditModal(false)
  }

  function handleEditClick(product) {
    setEditingProduct(product)
    setTitle(product.title)
    setPrice(product.price)
    setImage(product.image)
    setShowEditModal(true)
  }

  function resetForm() {
    setTitle("")
    setPrice(null)
    setImage("")
    setEditingProduct(null)
  }

  function showToast(severity, summary, detail) {
    toast.current.show({ severity, summary, detail, life: 3000 })
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
      onClick={() => setShowAddModal(true)} 
      className="p-button-info"
      raised
    />
  )

  const productItemTemplate = (product) => {
    const isLocal = localProducts.some(lp => lp.id === product.id)
    
    return (
      <Card className="mb-4 shadow-2 border-blue-100 product-item">
        <div className="flex flex-column md:flex-row align-items-center md:align-items-start gap-4">
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-10rem h-10rem object-cover border-round border-2 border-blue-100"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "https://via.placeholder.com/300"
              }}
            />
            {isLocal && (
              <div className="absolute top-0 right-0 mt-2 mr-2">
                <Badge value="Local" severity="info"></Badge>
              </div>
            )}
          </div>
          
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
            
            <div className="flex gap-2">
              {isLocal && (
                <>
                  <Button 
                    label="Editar" 
                    icon="pi pi-pencil" 
                    className="p-button-outlined p-button-info"
                    onClick={() => handleEditClick(product)}
                  />
                  <Button 
                    label="Excluir" 
                    icon="pi pi-trash" 
                    className="p-button-outlined p-button-danger"
                    onClick={() => {
                      if (window.confirm('Tem certeza que deseja excluir este produto?')) {
                        removeProduct(product.id)
                        showToast('info', 'Excluído', 'Produto removido com sucesso.')
                      }
                    }}
                  />
                </>
              )}
              {!isLocal && (
                <Button 
                  label="Clonar para Local" 
                  icon="pi pi-copy" 
                  className="p-button-outlined p-button-success"
                  onClick={() => {
                    const clonedProduct = {
                      ...product,
                      id: Date.now(),
                      clonedFrom: product.id
                    }
                    addProduct(clonedProduct)
                    showToast('success', 'Clonado', 'Produto clonado para edição local.')
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const modalFooter = (mode) => (
    <div className="flex gap-2 justify-content-end mt-4">
      <Button 
        label="Cancelar" 
        icon="pi pi-times" 
        className="p-button-outlined p-button-secondary"
        onClick={() => {
          mode === 'add' ? setShowAddModal(false) : setShowEditModal(false)
          resetForm()
        }}
      />
      <Button 
        label={mode === 'add' ? "Adicionar" : "Salvar"} 
        icon={mode === 'add' ? "pi pi-plus" : "pi pi-save"} 
        onClick={mode === 'add' ? handleAdd : handleEdit} 
        className="p-button-info"
        raised
      />
    </div>
  )

  return (
    <div className="admin-container p-4">
      <Toast ref={toast} position="top-right" />
      
      {/* TOOLBAR */}
      <Toolbar 
        className="mb-4 border-blue-200"
        left={leftToolbarTemplate} 
        right={rightToolbarTemplate}
      />

      {/* MODAL DE ADIÇÃO */}
      <Dialog 
        header={
          <div className="flex align-items-center gap-2">
            <i className="pi pi-plus-circle text-primary"></i>
            <span>Adicionar Produto</span>
          </div>
        } 
        visible={showAddModal} 
        style={{ width: '450px' }}
        onHide={() => {
          setShowAddModal(false)
          resetForm()
        }}
        draggable={false}
        className="shadow-5"
      >
        <div className="p-fluid" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="field">
            <span className="p-float-label">
              <InputText 
                id="add-title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full"
                autoFocus
              />
              <label htmlFor="add-title">
                <i className="pi pi-tag mr-2"></i>
                Título *
              </label>
            </span>
          </div>

          <div className="field">
            <span className="p-float-label">
              <InputNumber 
                id="add-price" 
                value={price} 
                onValueChange={(e) => setPrice(e.value)} 
                mode="currency" 
                currency="BRL"
                locale="pt-BR"
                className="w-full"
              />
              <label htmlFor="add-price">
                <i className="pi pi-money-bill mr-2"></i>
                Preço *
              </label>
            </span>
          </div>

          <div className="field">
            <span className="p-float-label">
              <InputText 
                id="add-image" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                className="w-full"
                placeholder="https://example.com/image.jpg"
              />
              <label htmlFor="add-image">
                <i className="pi pi-image mr-2"></i>
                URL da imagem (opcional)
              </label>
            </span>
            {image && (
              <div className="mt-2">
                <small className="text-muted">Pré-visualização:</small>
                <img 
                  src={image} 
                  alt="Pré-visualização" 
                  className="mt-1 w-3 h-3 border-round border-1"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "https://via.placeholder.com/300"
                    e.target.className = "mt-1 w-3 h-3 border-round border-1 p-3"
                  }}
                />
              </div>
            )}
          </div>

          {modalFooter('add')}
        </div>
      </Dialog>

      {/* MODAL DE EDIÇÃO */}
      <Dialog 
        header={
          <div className="flex align-items-center gap-2">
            <i className="pi pi-pencil text-primary"></i>
            <span>Editar Produto</span>
            {editingProduct && (
              <Tag value={`ID: ${editingProduct.id}`} severity="info" className="ml-2" />
            )}
          </div>
        } 
        visible={showEditModal} 
        style={{ width: '450px' }}
        onHide={() => {
          setShowEditModal(false)
          resetForm()
        }}
        draggable={false}
        className="shadow-5"
      >
        <div className="p-fluid" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="field">
            <span className="p-float-label">
              <InputText 
                id="edit-title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full"
                autoFocus
              />
              <label htmlFor="edit-title">
                <i className="pi pi-tag mr-2"></i>
                Título *
              </label>
            </span>
          </div>

          <div className="field">
            <span className="p-float-label">
              <InputNumber 
                id="edit-price" 
                value={price} 
                onValueChange={(e) => setPrice(e.value)} 
                mode="currency" 
                currency="BRL"
                locale="pt-BR"
                className="w-full"
              />
              <label htmlFor="edit-price">
                <i className="pi pi-money-bill mr-2"></i>
                Preço *
              </label>
            </span>
          </div>

          <div className="field">
            <span className="p-float-label">
              <InputText 
                id="edit-image" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                className="w-full"
                placeholder="https://example.com/image.jpg"
              />
              <label htmlFor="edit-image">
                <i className="pi pi-image mr-2"></i>
                URL da imagem (opcional)
              </label>
            </span>
            {image && (
              <div className="mt-2">
                <small className="text-muted">Pré-visualização:</small>
                <img 
                  src={image} 
                  alt="Pré-visualização" 
                  className="mt-1 w-3 h-3 border-round border-1"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "https://via.placeholder.com/300"
                    e.target.className = "mt-1 w-3 h-3 border-round border-1 p-3"
                  }}
                />
              </div>
            )}
          </div>

          {modalFooter('edit')}
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
          <p className="text-muted mt-2">
            <i className="pi pi-info-circle mr-2"></i>
            Produtos da API podem ser clonados para edição local
          </p>
        </div>

        <DataView
          value={[...apiProducts, ...localProducts]}
          itemTemplate={productItemTemplate}
          paginator
          rows={5}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} produtos"
          rowsPerPageOptions={[5, 10, 20]}
          emptyMessage="Nenhum produto encontrado"
        />
      </Card>
    </div>
  )
}