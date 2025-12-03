import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Register.css' // Importando o CSS

export default function Register(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    
    // Validação básica
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!")
      return
    }
    
    if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres!")
      return
    }
    
    const result = register(username, password)

    if (!result.success) {
      alert(result.message)
      return
    }

    alert("Cadastro realizado com sucesso!")
    navigate('/login')
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Criar Conta</h2>
          <div className="register-subtitle">
            Junte-se a nós! Crie sua conta para começar
          </div>
        </div>

        <form onSubmit={submit} className="register-form">
          <div className="input-group">
            <input
              className="register-input"
              placeholder="Usuário"
              value={username}
              onChange={e=>setUsername(e.target.value)}
              required
            />
            <div className="input-hint">
              Use no mínimo 4 caracteres
            </div>
          </div>
          
          <div className="input-group">
            <input
              className="register-input"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              required
            />
            <div className="input-hint">
              Mínimo de 6 caracteres
            </div>
          </div>
          
          <div className="input-group">
            <input
              className="register-input"
              type="password"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={e=>setConfirmPassword(e.target.value)}
              required
            />
            <div className="input-hint">
              Digite a senha novamente
            </div>
          </div>

          <button type="submit" className="register-button">
            Cadastrar
          </button>
        </form>

        <div className="register-footer">
          <p className="login-link">
            Já possui conta? <Link to="/login">Entrar</Link>
          </p>
          
          <div className="password-requirements">
            <div className="requirements-title">Requisitos da senha:</div>
            <ul className="requirements-list">
              <li className={password.length >= 6 ? 'requirement-met' : ''}>
                Pelo menos 6 caracteres
              </li>
              <li className={password === confirmPassword && password !== '' ? 'requirement-met' : ''}>
                Senhas coincidem
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}