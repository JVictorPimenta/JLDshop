import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Menubar } from 'primereact/menubar'

export default function Header() {
  const { items } = useCart()
  const { user, logout } = useAuth()
  
  const cartCount = Math.min(items.reduce((s, i) => s + i.qty, 0), 99)
  const showPlus = items.reduce((s, i) => s + i.qty, 0) > 99
  const menuItems = [
    {
      label: 'Produtos',
      icon: 'pi pi-shopping-bag',
      url: '/products',
      className: 'p-menuitem-link'
    },
    {
      label: 'Carrinho',
      icon: 'pi pi-shopping-cart',
      url: '/cart',
      template: (item) => (
        <Link to={item.url} className="p-menuitem-link p-relative">
          <i className={item.icon}></i>
          <span className="ml-2">{item.label}</span>
          {cartCount > 0 && (
            <Badge 
              value={`${cartCount}${showPlus ? '+' : ''}`} 
              severity="danger" 
              className="ml-2"
            />
          )}
        </Link>
      )
    }
  ]

  const start = (
    <Link to="/" className="flex align-items-center no-underline">
      <span className="text-2xl font-bold text-amber-600">JDLShop</span>
    </Link>
  )

  const end = (
    <div className="flex align-items-center gap-3">
      {user ? (
        <>
          <div className="hidden md:flex align-items-center gap-2">
            <Avatar 
              label={user.username?.charAt(0).toUpperCase()} 
              size="normal" 
              shape="circle" 
              className="bg-amber-100 text-amber-700" 
            />
            <span className="text-gray-700">Olá, {user.username}</span>
          </div>
          
          {user.isAdmin && (
            <Link to="/admin" className="no-underline">
              <Button 
                label="Admin" 
                icon="pi pi-cog" 
                className="p-button-outlined p-button-sm" 
              />
            </Link>
          )}
          
          <Button 
            label="Sair" 
            icon="pi pi-sign-out" 
            className="p-button-text p-button-sm p-button-secondary" 
            onClick={logout}
          />
        </>
      ) : (
        <Link to="/login" className="no-underline">
          <Button 
            label="Entrar" 
            icon="pi pi-user" 
            className="p-button-raised p-button-sm bg-amber-600 border-amber-600 hover:bg-amber-700" 
          />
        </Link>
      )}
    </div>
  )

  // Using Menubar component (PrimeReact way)
  return (
    <header className="sticky top-0 z-5 shadow-2 surface-0">
      <div className="px-4">
        <Menubar 
          model={menuItems}
          start={start}
          end={end}
          className="border-none surface-0"
        />
      </div>
    </header>
  )

}