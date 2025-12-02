import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/Cart'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import PaginaDePagamento from './pages/PaginaDePagamento'
import Confirmacao from './pages/Confirmacao'   // ✅ NOVO IMPORT
import TesteSteps from './pages/TesteSteps';

export default function App(){
  return (
    <div className="app-container">
      <Header />

      <Routes>
        <Route path="/teste-steps" element={<TesteSteps />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/pagamento" element={<PaginaDePagamento />} />
        <Route path="/confirmacao" element={<Confirmacao />} />   {/* ✅ NOVA ROTA */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>

      <Footer />
    </div>
  )
}
