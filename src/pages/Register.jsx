import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Register(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const result = register(username, password)

    if (!result.success) {
      alert(result.message)
      return
    }

    alert("Cadastro realizado com sucesso!")
    navigate('/login')
  }

  return (
    <div style={{maxWidth:420}}>
      <h2>Criar Conta</h2>

      <form onSubmit={submit} style={{display:'grid',gap:8}}>
        <input
          placeholder="Usuário"
          value={username}
          onChange={e=>setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <p>Já possui conta? <Link to="/login">Entrar</Link></p>
    </div>
  )
}
