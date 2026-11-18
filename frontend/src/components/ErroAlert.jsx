import { Alert } from '@mui/material'

export default function ErroAlert({ mensagem }) {
  if (!mensagem) return null
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      {mensagem}
    </Alert>
  )
}
