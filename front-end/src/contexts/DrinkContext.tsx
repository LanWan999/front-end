import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { createDrink, deleteDrink, fetchAllDrinks, updateDrink } from "../api/drinkApi"
import React from 'react'

export interface CreateDrink {
    _id: string
    image: string
    name: string
    price: number
    description: string
}

export interface Drink extends CreateDrink {
    id: string
}

type DrinksPageContextType = {
    drinksList: Drink[]
    editDrinkData: Drink | null
    addDrink: (newDrink: CreateDrink) => void
    removeDrink: (id: string) => void
    editDrink: (drinkData: Drink) => void
    getEditDrink: (drinkData: Drink | null) => void
}

const DrinksPageContext = createContext<DrinksPageContextType | undefined>(undefined)

type DrinksPageContextProviderProps = {
    children: ReactNode
}

export const DrinksPageContextProvider: React.FC<DrinksPageContextProviderProps> = ({ children }) => {
    const [drinks, setDrinks] = useState<Drink[]>([])
    const [editDrinkData, setEditDrinkData] = useState<Drink | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const drinksData = await fetchAllDrinks()
            setDrinks(drinksData.reverse())
        }

        fetchData()
    }, []) 

    const addDrink = async (newDrink: CreateDrink) => {
        try{
            const createdDrinkData = await createDrink(newDrink)
    
            setDrinks(prevState => [createdDrinkData, ...prevState])
        } catch (error) {
            console.error("Error adding drink:", error)
        }
    }
    
    const removeDrink = (id: string) => {
        deleteDrink(id)
        setDrinks(prevState => prevState.filter(drink => drink.id !== id))
    }

    const editDrink = async (drinkData: Drink) => {
        await updateDrink(drinkData)

        setDrinks(prevState => 
            prevState.map(drink =>
                drink.id === drinkData.id ? drinkData : drink
            )
        )
        
        setEditDrinkData(null)
    }

    const getEditDrink = (drinkData: Drink | null) => {
        setEditDrinkData(drinkData)
    }

    const ctxValue: DrinksPageContextType = {
        drinksList: drinks,
        editDrinkData,
        addDrink,
        removeDrink,
        editDrink,
        getEditDrink
    }

    return (
        <DrinksPageContext.Provider value={ctxValue}>
            {children}
        </DrinksPageContext.Provider>
    )
}

export const useDrinks = () => {
    const ctx = useContext(DrinksPageContext)

    if (!ctx) {
        throw new Error('useDessert cannot be used outside the DrinksPageContextProvider')
    }

    return ctx
}