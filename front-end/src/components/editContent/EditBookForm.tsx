import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import api from "../../api"
import BookForm from "../../forms/BookForm"
import { Book } from "../../types/book"

type Props = {
  id: string
  onCancel?: () => void
}

function EditBookForm({ id, onCancel }: Props) {
  const [book, setBook] = useState<Book | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await api.get(`/books/${id}`)
        setBook(data)
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error)
          setError(error.message)
        } else {
          setError("Unexpected error")
        }
      }
    }

    fetchBook()
  }, [id])

  if (error) return <p>{error}</p>
  if (!book) return <p>Loading...</p>

  return (
    <div>
      <h2>Editing: {book.title}</h2>
      <BookForm
        editBookData={{
          ...book,
          price: book.price.toString(),
          genres: book.genres.map((genre) => genre.title)
        }}
      />

      {onCancel && <button onClick={onCancel}>Cancel</button>}
    </div>
  )
}

export default EditBookForm