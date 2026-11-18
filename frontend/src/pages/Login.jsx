import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, Paper, TextField, Typography, Alert } from '@mui/material'
import { useAuth } from '../AuthContext'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const { login: fazerLogin, registrar } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setSucesso('')

    try {
      if (isLogin) {
        await fazerLogin(login, senha)
        navigate('/')
      } else {
        await registrar(login, senha)
        setSucesso('Usuário criado com sucesso! Faça o login.')
        setIsLogin(true)
        setSenha('')
      }
    } catch (err) {
      setErro(err.message)
    }
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          {isLogin ? 'Entrar na Biblioteca' : 'Criar Conta'}
        </Typography>

        {erro && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{erro}</Alert>}
        {sucesso && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{sucesso}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'grid', gap: 2 }}>
          <TextField 
            label="Login" 
            value={login} 
            onChange={(e) => setLogin(e.target.value)} 
            required 
          />
          <TextField 
            label="Senha" 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
          />
          <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }}>
            {isLogin ? 'Entrar' : 'Registrar'}
          </Button>
        </Box>

        <Button onClick={() => setIsLogin(!isLogin)} sx={{ mt: 2 }}>
          {isLogin ? 'Não tem conta? Registre-se' : 'Já tem conta? Faça login'}
        </Button>
      </Paper>
    </Container>
  )
}
