import { useEffect, useState } from "react"
import { Book } from "../../types/book"
import api from "../../api"
import { useParams } from "react-router-dom"
import { useCart } from "../../contexts/CartContext"
import { Product } from "../../types/cart"
import styles from "./BookPage.module.scss"
import { toast } from 'react-toastify'

const BookPage = () => {
    const [book, setBook] = useState<Book | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const { id } = useParams()

    const { addProduct } = useCart();

    const [quantity, setQuantity] = useState(1)

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
        const product = {
          ...mapBookToProduct(book),
          stock: quantity, 
        };
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

    const handleChangeQuantity = (delta: number) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

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
        <div className={styles.pageContainer}>
            <div className={styles.bookWrapper}>
                <div className={styles.bookCover}>
                    <img src={book.cover} alt={book.title} />
                </div>
                <div className={styles.bookInformation}>
                    <div className={styles.bookDetails}>
                        <div className={styles.bookAuthor}>Author: {book.author}</div>
                        <div className={styles.bookTitle}>{book.title}</div>
                        <div>{book.description}</div>
                    </div>
                    <div className={styles.bookPrice}>{book.price} €</div>
                    <div className={styles.quantityControls}>
                        <button className={styles.qtyBtn} onClick={() => handleChangeQuantity(-1)}>-</button>
                        <div className={styles.quantityDisplay}>{quantity}</div>
                        <button className={styles.qtyBtn} onClick={() => handleChangeQuantity(1)}>+</button>
                        <button className={styles.addToCartBtn} onClick={() => handleAddToCart(book)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookPage