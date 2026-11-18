import { createContext, useContext, useState, useEffect } from 'react'
import api from './api'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUsuario({ token }) // Em um app real, faríamos uma chamada para validar o token
    }
    setLoading(false)
  }, [])

  async function login(login, senha) {
    try {
      const res = await api.post('/auth/login', { login, senha })
      const token = res.data.token
      localStorage.setItem('token', token)
      setUsuario({ token })
      return true
    } catch (err) {
      throw new Error('Login ou senha inválidos')
    }
  }

  async function registrar(login, senha) {
    try {
      await api.post('/auth/register', { login, senha })
      return true
    } catch (err) {
      throw new Error('Erro ao registrar. Tente outro login.')
    }
  }

  function logout() {
    localStorage.removeItem('token')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, loading, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
