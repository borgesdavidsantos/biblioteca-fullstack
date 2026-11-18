import { Route, Routes } from 'react-router-dom'
import { Container } from '@mui/material'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LivroForm from './pages/LivroForm'
import LivroDetalhes from './pages/LivroDetalhes'
import Autores from './pages/Autores'

export default function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/livros/novo" element={<LivroForm />} />
          <Route path="/livros/:id" element={<LivroDetalhes />} />
          <Route path="/livros/:id/editar" element={<LivroForm />} />
          <Route path="/autores" element={<Autores />} />
        </Routes>
      </Container>
    </>
  )
}
