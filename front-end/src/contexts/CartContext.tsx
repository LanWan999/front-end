import { createContext, ReactNode, useContext, useReducer } from "react"
import { Action, CartProduct, cartReducer } from "../contexts/reducers/CartReducer"
import { ActionTypes } from "../contexts/reducers/CartReducer"
import React from "react"
import { useEffect } from "react"
import { Product } from "../types/cart"
import { addToCart, getCart, removeFromCart } from "../api/cartApi"


interface CartState {
    cart: CartProduct[];
}

interface CartPageContextType extends CartState {
    cart: CartProduct[]
    addProduct: (product: Product) => void
    removeProduct: (id : Product['_id'], token?: string) => void
    update: (id : Product['_id'], quantity: number) => void
    clear: () => void
    fetchCart: (token: string) => Promise<void>
    dispatch: React.Dispatch<Action>
    mergeGuestCartOnLogin: (token: string) => Promise<void>
}

interface ServerCartEntry {
    productId: Product;
    quantity: number;
}


export const CartPageContext = createContext<CartPageContextType | undefined>(undefined)

type CartPageContextProviderProps = {
    children: ReactNode
}

export const CartPageContextProvider: React.FC<CartPageContextProviderProps> = ({ children }) => {

    const loadCartFromLocalStorage = (): CartProduct[] => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    };

    const [state, dispatch] = useReducer(cartReducer, { cart: loadCartFromLocalStorage() })
    const { cart } = state

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    const addProduct = async (product: Product, token?: string) => {
        const cartProduct: CartProduct = {
            ...product,
            quantity: 1
        }
        console.log("Adding product to cart", cartProduct)
        dispatch({type: ActionTypes.ADD_ITEM, payload: cartProduct})

        if (token) {
            try {
                await addToCart(product._id, 1, token);
            } catch (error) {
                console.error("Failed to sync add to cart:", error);
            }
        }
    }
    
    const removeProduct= async (id: Product['_id'], token?: string) => {
        dispatch({ type: ActionTypes.REMOVE_ITEM, payload: id })

        if (token) {
            try {
                await removeFromCart(id, token);
            } catch (error) {
                console.error("Failed to sync remove from cart:", error);
            }
        }
    }

    const clear = () => dispatch({ type: ActionTypes.CLEAR_CART })


    const update = (id : Product['_id'], quantity: number) =>  dispatch({ type: ActionTypes.UPDATE_QUANTITY, payload: { id, quantity}  })
    
    const fetchCart = async (token: string) => {
        try {
            const cartData = await getCart(token); 
            dispatch({ type: ActionTypes.CLEAR_CART }); 

            cartData.products.forEach((cartItem: ServerCartEntry) => {

                const product = cartItem.productId;
                const quantity = cartItem.quantity;

                if (!product || typeof product !== 'object') {
                    console.warn("Skipping invalid product in cart:", product);
                    return; // skip this entry
                }
    
                const cartProduct: CartProduct = {
                    ...product,
                    quantity
                };

                dispatch({ type: ActionTypes.ADD_ITEM, payload: cartProduct });
            });
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const mergeGuestCartOnLogin = async (token: string) => {
        const guestCart = loadCartFromLocalStorage(); // Get local cart
    
        if (guestCart.length === 0) return;
    
        try {
            for (const item of guestCart) {
                await addToCart(item._id, item.quantity, token); // Save each item to server
            }
    
            localStorage.removeItem("cart"); // Clear local guest cart
            await fetchCart(token); // Fetch updated cart from server
        } catch (error) {
            console.error("Failed to merge guest cart on login:", error);
        }
    };

    const ctxValue: CartPageContextType = {
        cart: cart,
        addProduct,
        removeProduct,
        update,
        clear,
        fetchCart,
        dispatch,
        mergeGuestCartOnLogin
    }

    return (
        <CartPageContext.Provider value={ctxValue}>
            {children}
        </CartPageContext.Provider>
    )
}

export const useCart = () => {
    const ctx = useContext(CartPageContext)

    if (!ctx) {
        throw new Error('useCart cannot be used outside the CartPageContextProvider')
    }

    return ctx
} 