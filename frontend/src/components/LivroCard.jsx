import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function LivroCard({ livro, onExcluir }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{livro.titulo}</Typography>
        <Typography color="text.secondary">
          {livro.autor?.nome}
          {livro.anoPublicacao ? ` • ${livro.anoPublicacao}` : ''}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/livros/${livro.id}`}>Detalhes</Button>
        <Button size="small" component={Link} to={`/livros/${livro.id}/editar`}>Editar</Button>
        <Button size="small" color="error" onClick={() => onExcluir(livro)}>Excluir</Button>
      </CardActions>
    </Card>
  )
}
