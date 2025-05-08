import React, { useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types/cart';
import styles from "./CartPage.module.scss"

const CartPage: React.FC<{ token?: string }> = ({ token }) => {
    const { cart, fetchCart, removeProduct, update, clear } = useCart();

    useEffect(() => {
        if (token) {
            if (token) fetchCart(token);
        }
    }, [token])

    if (cart.length === 0) return <p>Your cart is empty.</p>

    const handleRemove = async (productId: Product['_id']) => {
        removeProduct(productId);
    };

    const handleUpdateQuantity = (id: string, quantity: number) => {
        if (quantity > 0) {
            update(id, quantity);
        }
    }

    const handleClearCart = () => {
        clear(); 
    }
    

    return (
        <div className={styles.pageContainer}>
            <h1>Your Cart</h1>
            <table className={styles.cartTable}>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <tr key={item._id}>
                            <td className={styles.productCell}>
                                <img src={item.image} alt={item.name} className={styles.bookCover} />
                                <div>
                                    <p className={styles.bookAuthor}>Author: {item.author}</p>
                                    <p className={styles.bookTitle}>{item.name}</p>
                                </div>
                            </td>
                            <td>€{item.price.toFixed(2)}</td>
                            <td>
                                <div className={styles.quantityControls}>
                                    <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                                </div>
                            </td>
                            <td>€{(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleRemove(item._id)} className={styles.removeButton}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handleClearCart} className={styles.clearCartButton}>Clear Cart</button>
        </div>
    );
};

export default CartPage;