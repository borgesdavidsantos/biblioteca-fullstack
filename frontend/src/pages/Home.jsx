import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import api, { mensagemDeErro } from '../api'
import Loading from '../components/Loading'
import ErroAlert from '../components/ErroAlert'
import LivroCard from '../components/LivroCard'

export default function Home() {
  const [livros, setLivros] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    api.get('/livros')
      .then((res) => setLivros(res.data))
      .catch((err) => setErro(mensagemDeErro(err)))
      .finally(() => setLoading(false))
  }, [])

  async function excluir(livro) {
    if (!window.confirm(`Excluir "${livro.titulo}"?`)) return
    try {
      await api.delete(`/livros/${livro.id}`)
      setLivros((atual) => atual.filter((l) => l.id !== livro.id))
    } catch (err) {
      setErro(mensagemDeErro(err))
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Livros</Typography>
        <Button variant="contained" component={Link} to="/livros/novo">Novo livro</Button>
      </Box>
      <ErroAlert mensagem={erro} />
      {loading ? <Loading /> : livros.length === 0 ? (
        <Typography color="text.secondary">Nenhum livro cadastrado ainda.</Typography>
      ) : (
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
          {livros.map((livro) => (
            <LivroCard key={livro.id} livro={livro} onExcluir={excluir} />
          ))}
        </Box>
      )}
    </>
  )
}
