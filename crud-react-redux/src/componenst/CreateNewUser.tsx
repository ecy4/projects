import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { useState } from 'react'
import { useUserActions } from '../hooks/useUserActions'

export function CreateNewUser () {
  const { addUser } = useUserActions()
  const [result, setResult] = useState<'ok' | 'ko' | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setResult(null)

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if (!name || !email || !github) {
      return setResult('ko')
    }

    addUser({ name, email, github })
    setResult('ok')
    form.reset()
  }

  return (
    <Card className="mt-4">
      <Title>Crear nuevo usuario</Title>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <TextInput name="name" placeholder="Nombre completo" />
        <TextInput name="email" placeholder="Correo electrónico" />
        <TextInput name="github" placeholder="Usuario de GitHub" />

        <div className="flex items-center gap-3">
          <Button type="submit" className="mt-2">
            Crear usuario
          </Button>

          {result === 'ok' && (
            <Badge color="green" className="mt-2">
              Guardado correctamente
            </Badge>
          )}
          {result === 'ko' && (
            <Badge color="red" className="mt-2">
              Todos los campos son obligatorios
            </Badge>
          )}
        </div>
      </form>
    </Card>
  )
}
