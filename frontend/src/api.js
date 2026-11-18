import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function mensagemDeErro(err) {
  const data = err.response?.data
  if (!data) return 'Não foi possível conectar à API.'
  if (data.erro) return data.erro
  if (data.status && data.error) return `Erro ${data.status}: ${data.error}`
  if (typeof data === 'object') return Object.values(data).join(' | ')
  return 'Erro inesperado.'
}

export default api
