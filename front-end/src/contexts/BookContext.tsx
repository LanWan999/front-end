import { createContext, ReactNode, useCallback, useContext, useState } from "react"
import api from "../api"
import { Book } from "../types/book"

interface BooksContextType {
    books: Book[]
    book: Book | null
    loading: boolean
    error: string | null
    fetchBookById: (id: string) => Promise<void>
    fetchAllBooks: () => Promise<void>
}

const BooksContext = createContext<BooksContextType | undefined>(undefined)

type BooksPageContextProviderProps = {
    children: ReactNode
}

export const BooksProvider: React.FC<BooksPageContextProviderProps> = ({ children }) => {
    const [books, setBooks] = useState<Book[]>([])
    const [book, setBook] = useState<Book | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchAllBooks = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const { data } = await api.get('/books')
            setBooks(data)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("An unexpected error occurred.")
            }
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchBookById = useCallback(async (id: string) => {
        setLoading(true)
        setError(null)
        try {
            const { data } = await api.get(`/books/${id}`)
            setBook(data)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("An unexpected error occurred.")
            }
        } finally {
            setLoading(false)
        }
    }, [])

    const ctxValue = {
        fetchAllBooks,
        fetchBookById,
        book,
        books,
        loading,
        error
    }

    return (
        <BooksContext.Provider value={ctxValue}>
            {children}
        </BooksContext.Provider>
    )
    
}

export const useBooks = () => {
    const ctx = useContext(BooksContext)

    if (!ctx) {
        throw new Error('useBooks cannot be used outside the BooksPageContextProvider')
    }


    return ctx
}