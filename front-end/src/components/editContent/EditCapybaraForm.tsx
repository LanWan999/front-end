import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import api from "../../api"
import CapybaraForm from "../../forms/CapybaraForm"
import { Capybara } from "../../types/capybara"

type Props = {
  id: string
  onCancel?: () => void
}

function EditCapybaraForm({ id, onCancel }: Props) {
  const [capybara, setCapybara] = useState<Capybara | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/capybaras/${id}`)
        setCapybara(data)
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error)
          setError(error.message)
        } else {
          setError('Unexpected error')
        }
      }
    }
    fetchData()
  }, [id])

  if (error) return <p>{error}</p>
  if (!capybara) return <p>Loading...</p>

  return (
    <div>
      <CapybaraForm
        editCapybaraData={capybara}
        />
        {onCancel && <button onClick={onCancel}>Cancel</button>}
    </div>
  )
}

export default EditCapybaraForm