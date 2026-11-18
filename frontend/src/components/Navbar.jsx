import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <MenuBookIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Biblioteca
          </Typography>
          <Button color="inherit" component={Link} to="/">Livros</Button>
          <Button color="inherit" component={Link} to="/autores">Autores</Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
