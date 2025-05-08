import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import api from "../../api"
import DessertsForm from "../../forms/DessertForm"
import { Dessert } from "../../types/dessert"

type Props = {
  id: string
  onCancel?: () => void
}

function EditDessertForm({ id, onCancel }: Props) {
  const [dessert, setDessert] = useState<Dessert | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/desserts/${id}`)
        setDessert(data)
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
  if (!dessert) return <p>Loading...</p>

  return (
    <div>
      <DessertsForm
        editDessertData={dessert}
      />
      {onCancel && <button onClick={onCancel}>Cancel</button>}
    </div>
  )
}

export default EditDessertForm