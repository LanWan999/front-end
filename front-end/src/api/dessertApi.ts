import { CreateDessert, Dessert } from "../contexts/DessertContext"
import api from "../api"


export const fetchAllDesserts = async (): Promise<Dessert[]> => {
    try {
        const { data } = await api.get(`/desserts`)
        return data
    } catch (error) {
        console.error("Error fetching desserts:", error)
        throw new Error('Something went wrong...')
    }
}

export const fetchSingleDessert = async (id: string): Promise<Dessert> => {
    try {
        const { data } = await api.get(`/desserts/${id}`)
        return data
    } catch (error) {
        console.error("Error fetching desserts:", error)
        throw new Error('Something went wrong...')
    }
}

export const createDessert = async (newDessertData: CreateDessert): Promise<Dessert> => {
    try {
        const { data } = await api.post(`/desserts`, newDessertData)
        return data
    } catch (error) {
        console.error("Error fetching desserts:", error)
        throw new Error('Something went wrong...')
    }
}

export const updateDessert = async (updatedDessertData: Dessert): Promise<Dessert> => {
    try {
        const { data } = await api.put(`/desserts/${updatedDessertData.id}`, updatedDessertData)
        return data
    } catch (error) {
        console.error("Error fetching desserts:", error)
        throw new Error('Something went wrong...')
    }
}

export const deleteDessert = async (id: string): Promise<void> => {
    try {
        await api.delete(`desserts/${id}`)
    } catch (error) {
        console.error("Error fetching desserts:", error)
        throw new Error('Something went wrong...')
    }
}