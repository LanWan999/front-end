import { CreateDrink, Drink } from "../contexts/DrinkContext"
import api from "../api"


export const fetchAllDrinks = async (): Promise<Drink[]> => {
    try {
        const { data } = await api.get(`/drinks`)
        return data
    } catch (error) {
        console.error("Error fetching drinks:", error)
        throw new Error('Something went wrong...')
    }
}

export const fetchSingleDrink = async (id: string): Promise<Drink> => {
    try {
        const { data } = await api.get(`/drinks/${id}`)
        return data
    } catch (error) {
        console.error("Error fetching drinks:", error)
        throw new Error('Something went wrong...')
    }
}

export const createDrink = async (newDrinkData: CreateDrink): Promise<Drink> => {
    try {
        const { data } = await api.post(`/drinks`, newDrinkData)
        return data
    } catch (error) {
        console.error("Error fetching drinks:", error)
        throw new Error('Something went wrong...')
    }
}

export const updateDrink = async (updatedDrinkData: Drink): Promise<Drink> => {
    try {
        const { data } = await api.put(`/drinks/${updatedDrinkData.id}`, updatedDrinkData)
        return data
    } catch (error) {
        console.error("Error fetching drinks:", error)
        throw new Error('Something went wrong...')
    }
}

export const deleteDrink = async (id: string): Promise<void> => {
    try {
        await api.delete(`drinks/${id}`)
    } catch (error) {
        console.error("Error fetching drinks:", error)
        throw new Error('Something went wrong...')
    }
}