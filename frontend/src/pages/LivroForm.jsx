import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Alert, Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import api, { mensagemDeErro } from '../api'
import Loading from '../components/Loading'
import ErroAlert from '../components/ErroAlert'

const vazio = { titulo: '', isbn: '', anoPublicacao: '', sinopse: '', autorId: '' }

export default function LivroForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(vazio)
  const [autores, setAutores] = useState([])
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregar() {
      try {
        const pedidos = [api.get('/autores')]
        if (id) pedidos.push(api.get(`/livros/${id}`))
        const [resAutores, resLivro] = await Promise.all(pedidos)
        setAutores(resAutores.data)
        if (resLivro) {
          const l = resLivro.data
          setForm({ titulo: l.titulo ?? '', isbn: l.isbn ?? '', anoPublicacao: l.anoPublicacao ?? '', sinopse: l.sinopse ?? '', autorId: l.autor?.id ?? '' })
        }
      } catch (err) {
        setErro(mensagemDeErro(err))
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [id])

  function alterar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function salvar(e) {
    e.preventDefault()
    setSalvando(true)
    setErro('')
    const dados = { ...form, anoPublicacao: form.anoPublicacao === '' ? null : Number(form.anoPublicacao), autorId: form.autorId === '' ? null : Number(form.autorId) }
    try {
      if (id) await api.put(`/livros/${id}`, dados)
      else await api.post('/livros', dados)
      navigate('/')
    } catch (err) {
      setErro(mensagemDeErro(err))
      setSalvando(false)
    }
  }

  if (loading) return <Loading />

  return (
    <Box component="form" onSubmit={salvar} sx={{ maxWidth: 600, display: 'grid', gap: 2 }}>
      <Typography variant="h4">{id ? 'Editar livro' : 'Novo livro'}</Typography>
      <ErroAlert mensagem={erro} />
      {autores.length === 0 && (
        <Alert severity="warning">Nenhum autor cadastrado. <Link to="/autores">Cadastre um autor</Link> antes de criar o livro.</Alert>
      )}
      <TextField label="Título" name="titulo" value={form.titulo} onChange={alterar} />
      <TextField label="ISBN" name="isbn" value={form.isbn} onChange={alterar} />
      <TextField label="Ano de publicação" name="anoPublicacao" type="number" value={form.anoPublicacao} onChange={alterar} />
      <TextField label="Autor" name="autorId" select value={form.autorId} onChange={alterar}>
        {autores.map((a) => <MenuItem key={a.id} value={a.id}>{a.nome}</MenuItem>)}
      </TextField>
      <TextField label="Sinopse" name="sinopse" multiline minRows={3} value={form.sinopse} onChange={alterar} />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained" disabled={salvando}>{salvando ? 'Salvando...' : 'Salvar'}</Button>
        <Button component={Link} to="/">Cancelar</Button>
      </Box>
    </Box>
  )
}
