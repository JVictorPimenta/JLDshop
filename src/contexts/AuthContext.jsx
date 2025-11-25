import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({children}){
  const [user, setUser] = useState(()=> {
    try { return JSON.parse(localStorage.getItem('user')) }
    catch { return null }
  })

  const login = (username, password) => {
    // For demo: accept any username/password. Mark admin if username contains 'admin'
    const u = { username, isAdmin: username.toLowerCase().includes('admin') }
    setUser(u)
    localStorage.setItem('user', JSON.stringify(u))
    return u
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}
