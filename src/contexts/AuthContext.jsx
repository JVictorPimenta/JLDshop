import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({children}){

  // Carrega o usuário logado
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) }
    catch { return null }
  })

  // Carrega a lista de usuários cadastrados
  const [users, setUsers] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('users')) || []
      
      // Garante que o ADMIN fixo sempre exista
      const adminFixed = {
        username: "Admin",
        password: "João10/10",
        isAdmin: true
      }

      const alreadyHas = saved.some(u => u.username === "Admin")

      return alreadyHas ? saved : [adminFixed, ...saved]
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])


  // ---------------------------------------------
  // CADASTRO
  // ---------------------------------------------
  const register = (username, password) => {
    const exists = users.some(u => u.username === username)

    if (exists) {
      return { success: false, message: "Usuário já existe." }
    }

    const newUser = {
      username,
      password,
      isAdmin: false // usuários normais NÃO são admin
    }

    const updated = [...users, newUser]
    setUsers(updated)

    return { success: true }
  }


  // ---------------------------------------------
  // LOGIN
  // ---------------------------------------------
  const login = (username, password) => {
    const found = users.find(
      u => u.username === username && u.password === password
    )

    if (!found) {
      return { success: false }
    }

    setUser(found)
    localStorage.setItem('user', JSON.stringify(found))

    return { success: true }
  }


  // ---------------------------------------------
  // LOGOUT
  // ---------------------------------------------
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }


  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  )
}
