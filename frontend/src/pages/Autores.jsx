import { useEffect, useState } from 'react'
import { Box, Button, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import api, { mensagemDeErro } from '../api'
import Loading from '../components/Loading'
import ErroAlert from '../components/ErroAlert'

const vazio = { nome: '', nacionalidade: '' }

export default function Autores() {
  const [autores, setAutores] = useState([])
  const [form, setForm] = useState(vazio)
  const [editandoId, setEditandoId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  async function carregar() {
    try {
      const res = await api.get('/autores')
      setAutores(res.data)
    } catch (err) {
      setErro(mensagemDeErro(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { carregar() }, [])

  function alterar(e) { setForm({ ...form, [e.target.name]: e.target.value }) }
  function cancelar() { setForm(vazio); setEditandoId(null) }

  async function salvar(e) {
    e.preventDefault()
    setSalvando(true)
    setErro('')
    try {
      if (editandoId) await api.put(`/autores/${editandoId}`, form)
      else await api.post('/autores', form)
      cancelar()
      await carregar()
    } catch (err) {
      setErro(mensagemDeErro(err))
    } finally {
      setSalvando(false)
    }
  }

  function editar(autor) {
    setEditandoId(autor.id)
    setForm({ nome: autor.nome ?? '', nacionalidade: autor.nacionalidade ?? '' })
  }

  async function excluir(autor) {
    if (!window.confirm(`Excluir o autor "${autor.nome}"?`)) return
    setErro('')
    try {
      await api.delete(`/autores/${autor.id}`)
      await carregar()
    } catch (err) {
      setErro(mensagemDeErro(err))
    }
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>Autores</Typography>
      <ErroAlert mensagem={erro} />
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box component="form" onSubmit={salvar} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField label="Nome" name="nome" value={form.nome} onChange={alterar} />
          <TextField label="Nacionalidade" name="nacionalidade" value={form.nacionalidade} onChange={alterar} />
          <Button type="submit" variant="contained" disabled={salvando}>{editandoId ? 'Atualizar' : 'Adicionar'}</Button>
          {editandoId && <Button onClick={cancelar}>Cancelar</Button>}
        </Box>
      </Paper>
      {loading ? <Loading /> : autores.length === 0 ? (
        <Typography color="text.secondary">Nenhum autor cadastrado ainda.</Typography>
      ) : (
        <Paper>
          <List>
            {autores.map((a) => (
              <ListItem key={a.id} secondaryAction={
                <>
                  <IconButton onClick={() => editar(a)} aria-label="editar"><EditIcon /></IconButton>
                  <IconButton onClick={() => excluir(a)} aria-label="excluir" color="error"><DeleteIcon /></IconButton>
                </>
              }>
                <ListItemText primary={a.nome} secondary={a.nacionalidade} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  )
}
