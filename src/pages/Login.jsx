import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Login.css' // Importando o CSS

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const result = login(username, password)

    if (!result.success) {
      alert("Usuário ou senha incorretos!")
      return
    }

    navigate('/')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Login</h2>
          <div className="login-subtitle">
            Bem-vindo de volta! Faça login para continuar
          </div>
        </div>

        <form onSubmit={submit} className="login-form">
          <div className="input-group">
            <input
              className="login-input"
              placeholder="Usuário"
              value={username}
              onChange={e=>setUsername(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <input
              className="login-input"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

        <div className="login-footer">
          <p className="register-link">
            Não tem conta? <Link to="/register">Cadastre-se</Link>
          </p>
          
          <div className="login-hint">
            <div className="hint-title">Dica de acesso:</div>
            <div className="hint-text">Usuário: <strong>Admin</strong> | Senha: <strong>João10/10</strong></div>
          </div>
        </div>
      </div>
    </div>
  )
}