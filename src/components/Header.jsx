import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

export default function Header(){

  const { items } = useCart()
  const { user, logout } = useAuth()

  return (
    <header className="header">

      <div className="brand"><Link to="/">E-Shop MVP</Link></div>

      <nav style={{display:'flex', gap:12, alignItems:'center'}}>

        <Link to="/products" style={{color: '#c7a373'}}>Produtos</Link>
        <Link to="/cart" style={{color: '#c7a373'}}> Carrinho 
        ({Math.min(items.reduce((s, i) => s + i.qty, 0), 99)}
        {items.reduce((s, i) => s + i.qty, 0) > 99 ? '+' : ''})
        </Link>

        {user ? (
          <>
            <span>Olá, {user.username}</span>
            <button onClick={logout}>Sair</button>
            {user.isAdmin && <Link to="/admin">Admin</Link>}
          </>
        ) : <Link to="/login">Entrar</Link>}

      </nav>

    </header>
  )
}
