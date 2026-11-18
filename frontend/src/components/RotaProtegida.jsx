import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function RotaProtegida() {
  const { usuario, loading } = useAuth()
  
  if (loading) return <div>Carregando...</div>
  
  return usuario ? <Outlet /> : <Navigate to="/login" />
}
