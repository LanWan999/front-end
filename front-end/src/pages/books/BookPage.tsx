import { useEffect, useState } from "react"
import { Book } from "../../types/book"
import api from "../../api"
import { useParams } from "react-router-dom"

const BookPage = () => {
    const [book, setBook] = useState<Book | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const { id } = useParams()

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await api.get(`/books/${id}`)

                setBook(data)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error)
                } else {
                    setError(new Error("Unknown error"))
                }
            } finally {
                setLoading(false)
            }
        }

        fetchBook()
    }, [id])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!book) {
        return <div>No book found.</div>
    }

    return (
        <div>
            <h1>{book.title}</h1>

        </div>
    )
}

export default BookPage