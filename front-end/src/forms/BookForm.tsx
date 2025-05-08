import React, { useEffect, useState } from "react"
import api from "../api"
import { Genre } from "../types/book"

type BookFormProps = {
  title: string
  cover: string
  description: string
  author: string
  price: string
  genres: string[]
  editBookData?: {
    _id: string
    title: string
    cover: string
    description: string
    author: string
    price: string
    genres: string[]
  }
  onSuccess?: () => void
}

function BookForm(props: Partial<BookFormProps>) {
  const { editBookData, onSuccess } = props

  const [title, setTitle] = useState("")
  const [cover, setCover] = useState("")
  const [description, setDescription] = useState("")
  const [author, setAuthor] = useState("")
  const [price, setPrice] = useState("")
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedGenre, setSelectedGenre] = useState("")
  const [bookId, setBookId] = useState<string | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await api.get("/genres")
        setGenres(data)

        if (editBookData) {
          setBookId(editBookData._id ?? '')
          setTitle(editBookData.title ?? '')
          setCover(editBookData.cover ?? '')
          setDescription(editBookData.description ?? '')
          setAuthor(editBookData.author ?? '')
          setPrice(editBookData.price ?? '')
          setSelectedGenres(editBookData.genres ?? [])
        }
      } catch (err) {
        console.error("Failed to fetch genres:", err)
      }
    }

    fetchGenres()
  }, [editBookData])

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title || !description) {
      setError("Title and description are required")
      return
    }

    const bookPayload = {
      title,
      cover,
      description,
      author,
      price,
      genres: selectedGenres,
    }

    try {
      if (editBookData) {
        api.put(`/books/${bookId}`, bookPayload)
        console.log('Book updated successfully')
      } else {
        api.post("/books", bookPayload)
        console.log('Book created successfully')
        if (onSuccess) onSuccess()
      }
    } catch (err) {
      console.error(err)
      setError("Failed to submit the form")
    }
  }

  const handleAddGenre = () => {
    if (selectedGenre && !selectedGenres.includes(selectedGenre)) {
      setSelectedGenres((prev) => [...prev, selectedGenre])
    }
  }

  const handleRemoveGenre = (genreId: string) => {
    setSelectedGenres((prev) => prev.filter((id) => id !== genreId))
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="cover">Cover</label>
          <input type="text" id="cover" value={cover} onChange={(e) => setCover(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="author">Author</label>
          <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="genres">Genres</label>
          <select id="genres" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">Select a genre</option>
            {genres.map((g) => (
              <option key={g._id} value={g._id}>
                {g.title}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddGenre}>
            Add Genre
          </button>
          <ul>
            {selectedGenres.map((id) => {
              const genre = genres.find((g) => g._id === id)
              return (
                <li key={id}>
                  {genre?.title}
                  <button type="button" onClick={() => handleRemoveGenre(id)}>
                    Remove
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <button type="submit">Edit Book</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default BookForm