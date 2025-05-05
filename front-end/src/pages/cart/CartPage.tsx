import React, { useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types/cart';

const CartPage: React.FC<{ token: string }> = ({ token }) => {
    const { cart, fetchCart, removeProduct, update, clear } = useCart();

    useEffect(() => {
        if (token) {
            fetchCart(token);
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
        <div>
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map((item) => {
                        switch (item.type) {
                            case 'book':
                                return (
                                    <li key={item._id}>
                                        <img src={item.image} alt={item.name} />
                                        <h3>{item.name}</h3>
                                        <p>Author: {item.author}</p>
                                        <p>Price: ${item.price}</p>
                                        <button onClick={() => handleRemove(item._id)}>Remove</button>
                                        <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                                        <div>{item.quantity}</div>
                                        <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                                    </li>
                                );
                            default:
                                return (
                                    <li key={item._id}>
                                        <h3>{item.name}</h3>
                                        <p>Price: ${item.price}</p>
                                        <button onClick={() => handleRemove(item._id)}>Remove</button>
                                        <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                                        <div>{item.quantity}</div>
                                        <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                                    </li>
                                );
                        }
                        
                    })}
                </ul>
            )}
            <button onClick={handleClearCart}>Clear Cart</button>
        </div>
    );
};

export default CartPage;