import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import api from "../../api"
import { User } from "../../types/users"
import UserForm from "../Users/UserForm"

type Props = {
  id: string
  onCancel?: () => void
}

function EditUserForm({ id, onCancel }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/users/${id}`)
        setUser(data)
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error)
          setError(error.message)
        } else {
          setError("Unexpected error")
        }
      }
    }

    fetchUser()
  }, [id])

  if (error) return <p>{error}</p>
  if (!user) return <p>Loading...</p>

  return (
    <div>
      <h2>Editing: {user.name}</h2>
      <UserForm editUserData={user} />
      {onCancel && <button onClick={onCancel}>Cancel</button>}
    </div>
  )
}

export default EditUserForm