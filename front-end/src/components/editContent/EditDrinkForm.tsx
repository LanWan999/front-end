import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import api from "../../api"
import { Drink } from "../../contexts/DrinkContext"
import DrinksForm from "../../forms/DrinkForm"

type Props = {
  id: string
  onCancel?: () => void
}

function EditDrinkForm({ id, onCancel }: Props) {
  const [drink, setDrink] = useState<Drink | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/drinks/${id}`)
        setDrink(data)
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
  if (!drink) return <p>Loading...</p>

  return (
    <div>
      <DrinksForm
        editDrinkData={drink}
      />
      {onCancel && <button onClick={onCancel}>Cancel</button>}
    </div>
  )
}

export default EditDrinkForm