import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Book, Genre } from "../../types/book"
import api from "../../api"
import styles from "./BooksPage.module.scss"
import { useCart } from "../../contexts/CartContext"
import { Product } from "../../types/cart"
import { toast } from 'react-toastify'

const BooksPage = () => {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [genres, setGenres] = useState<Genre[]>([])
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await api.get('/books')
                console.log('Books data:', data)

                setBooks(data)
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

        fetchBooks()
    }, [setBooks])

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const { data } = await api.get('/genres'); 
                setGenres(data);
            } catch (error) {
                console.error("Failed to fetch genres:", error);
            }
        };
        fetchGenres();
    }, []);

    const filteredBooks = selectedGenre
    ? books.filter(book => book.genres.some(genre => genre._id === selectedGenre))
    : books;

    const { addProduct } = useCart();

    const mapBookToProduct = (book: Book): Product => ({
        _id: book._id,
        name: book.title,
        image: book.cover,
        price: book.price,
        stock: 1, 
        type: 'book',
        author: book.author,
        genres: book.genres,
    });

    const handleAddToCart = (book: Book) => {
        const product = mapBookToProduct(book);
        addProduct(product);
        toast.success("Added to cart!", {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    };


    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.sidebar}>
                <h2>Browse by Genre</h2>
                <ul className={styles.genreList}>
                    <li onClick={() => setSelectedGenre(null)} className={!selectedGenre ? styles.activeGenre : ""}>All</li>
                    {genres.map(genre => (
                        <li key={genre._id} onClick={() => setSelectedGenre(genre._id)} className={selectedGenre === genre._id ? styles.activeGenre : ""}>
                            {genre.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.booksContainer}>
                {filteredBooks.map(book => (
                    <div key={book._id} className={styles.bookCard}>
                        <img src={book.cover} alt={book.title}  className={styles.bookCover}/>
                        <div className={styles.bookDetails}>
                            <Link to={`/books/${book._id}`} className={styles.bookTitle}>{book.title}</Link>
                            <div >
                                <p className={styles.bookAuthor}>{book.author}</p>
                                <p className={styles.bookPrice}>{book.price} €</p>
                            </div>
                            <button onClick={() => handleAddToCart(book)} className={styles.addToCartBtn}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BooksPage