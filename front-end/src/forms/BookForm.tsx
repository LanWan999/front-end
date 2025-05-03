import { useEffect, useState } from "react";
import api from "../api";
import { Genre } from "../types/book";

function BookForm() {

    const [title, setTitle] = useState('')
    const [cover, setCover] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [price, setPrice] = useState('')
    const [genres, setGenres] = useState<Genre[]>([])
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [selectedGenre, setSelectedGenre] = useState<string>('')

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const { data } = await api.get("/genres");
                setGenres(data);
            } catch (error) {
                console.error("Failed to fetch genres:", error);
            }
        };

        fetchGenres();
    }, []);

    const handleAddGenre = () => {
        if (selectedGenre && !selectedGenres.includes(selectedGenre)) {
            setSelectedGenres(prev => [...prev, selectedGenre]);
        }
    };

    const handleRemoveGenre = (genreId: string) => {
        setSelectedGenres(prev => prev.filter(id => id !== genreId));
    };


    const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
    const coverHandler = (event: React.ChangeEvent<HTMLInputElement>) => setCover(event.target.value)
    const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)
    const authorHandler = (event: React.ChangeEvent<HTMLInputElement>) => setAuthor(event.target.value)
    const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => setPrice(event.target.value)


    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newBook = {
            title,
            cover,
            description,
            author,
            price,
            genres: selectedGenres

        }

        const { data } = await api.post("/books", newBook)
        console.log(data)
    }

    return (
        <div>
            <h1>Add a book</h1>
            <form onSubmit={submitHandler}>
                <div className="form-control">
                    <label htmlFor="cover">Cover</label>
                    <input type="text" name="cover" id="cover" value={cover} onChange={coverHandler}/>
                </div>
                <div className="form-control">
                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" id="author" value={author} onChange={authorHandler}/>
                </div>
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" value={title} onChange={titleHandler}/>
                </div>
                <div className="form-control">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" value={description} onChange={descriptionHandler}/>
                </div>
                <div className="form-control">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" value={price} onChange={priceHandler}/>
                </div>
                <div className="form-control">
                    <label htmlFor="genres">Genres</label>
                    <div>
                        <select
                            name="genres"
                            id="genres"
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                        >
                            <option value="">Select a genre</option>
                            {genres.map((genre: { _id: string; title: string }) => (
                                <option key={genre._id} value={genre._id}>
                                    {genre.title}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={handleAddGenre}>
                            Add Genre
                        </button>
                    </div>
                    <div>
                        <h4>Selected Genres:</h4>
                        <ul>
                            {selectedGenres.map(genreId => {
                                const genre = genres.find((g: { _id: string }) => g._id === genreId);
                                return (
                                    <li key={genreId}>
                                        {genre?.title}
                                        <button type="button" onClick={() => handleRemoveGenre(genreId)}>
                                            Remove
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <button type="submit">Add Book</button>

            </form>
        </div>
    )
}

export default BookForm