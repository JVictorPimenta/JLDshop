import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = (e)=> {
    e.preventDefault()
    login(username, password)
    navigate('/')
  }

  return (
    <div style={{maxWidth:420}}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{display:'grid',gap:8}}>
        <input placeholder="Usuário" value={username} onChange={e=>setUsername(e.target.value)} />
        <input placeholder="Senha" value={password} type="password" onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
      <p>Dica: use um nome com 'admin' para acessar a área administrativa.</p>
    </div>
  )
}
