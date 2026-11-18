import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import api, { mensagemDeErro } from '../api'
import Loading from '../components/Loading'
import ErroAlert from '../components/ErroAlert'

export default function LivroDetalhes() {
  const { id } = useParams()
  const [livro, setLivro] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    api.get(`/livros/${id}`)
      .then((res) => setLivro(res.data))
      .catch((err) => setErro(mensagemDeErro(err)))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Loading />

  return (
    <Box sx={{ maxWidth: 700 }}>
      <ErroAlert mensagem={erro} />
      {livro && (
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>{livro.titulo}</Typography>
            <Typography color="text.secondary">Autor: {livro.autor?.nome} ({livro.autor?.nacionalidade || 'nacionalidade não informada'})</Typography>
            <Typography color="text.secondary">Ano: {livro.anoPublicacao || '-'}</Typography>
            <Typography color="text.secondary" gutterBottom>ISBN: {livro.isbn || '-'}</Typography>
            <Typography sx={{ mt: 2 }}>{livro.sinopse || 'Sem sinopse.'}</Typography>
          </CardContent>
        </Card>
      )}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        {livro && <Button variant="contained" component={Link} to={`/livros/${livro.id}/editar`}>Editar</Button>}
        <Button component={Link} to="/">Voltar</Button>
      </Box>
    </Box>
  )
}
