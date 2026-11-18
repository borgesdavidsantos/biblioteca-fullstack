import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Navbar() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <MenuBookIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Biblioteca
          </Typography>
          
          {usuario && (
            <>
              <Button color="inherit" component={Link} to="/">Livros</Button>
              <Button color="inherit" component={Link} to="/autores">Autores</Button>
              <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                Sair
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
