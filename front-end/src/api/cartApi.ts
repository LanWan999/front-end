import api from '../api';

export const addToCart = async (productId: string, quantity: number, token: string) => {
    try {
        const response = await api.post(
            `/cart/add`,
            { productId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

export const getCart = async (token: string) => {
    try {
        const response = await api.get(`/cart`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

export const removeFromCart = async (productId: string, token: string) => {
    try {
        const response = await api.delete(`/cart/remove`, {
            data: { productId },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
};