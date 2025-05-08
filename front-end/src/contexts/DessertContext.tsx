import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { createDessert, deleteDessert, fetchAllDesserts } from "../api/dessertApi"
import React from 'react'

export interface CreateDessert {
    id: string
    image: string
    name: string
    price: number
    description: string
}

export interface Dessert extends CreateDessert {
    id: string
}

type DessertsPageContextType = {
    dessertsList: Dessert[]
    editDessertData: Dessert | null
    addDessert: (newDessert: CreateDessert) => void
    removeDessert: (id: string) => void
    getEditDessert: (drinkData: Dessert | null) => void
}

const DessertsPageContext = createContext<DessertsPageContextType | undefined>(undefined)

type DessertsPageContextProviderProps = {
    children: ReactNode
}

export const DessertsPageContextProvider: React.FC<DessertsPageContextProviderProps> = ({ children }) => {
    const [desserts, setDesserts] = useState<Dessert[]>([])

    const [editDessertData, setEditDessertData] = useState<Dessert | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const dessertsData = await fetchAllDesserts()
            setDesserts(dessertsData.reverse())
        }

        fetchData()
    }, []) 

    const addDessert = async (newDessert: CreateDessert) => {
        try{
            const createdDessertData = await createDessert(newDessert)
    
            setDesserts(prevState => [createdDessertData, ...prevState])
        } catch (error) {
            console.error("Error adding dessert:", error)
        }
    }

    const getEditDessert = (dessertData: Dessert | null) => {
        setEditDessertData(dessertData)
    }
    
    const removeDessert = (id: string) => {
        deleteDessert(id)
        setDesserts(prevState => prevState.filter(dessert => dessert.id !== id))
    }

    const ctxValue: DessertsPageContextType = {
        dessertsList: desserts,
        editDessertData,
        addDessert,
        getEditDessert,
        removeDessert,

    }

    return (
        <DessertsPageContext.Provider value={ctxValue}>
            {children}
        </DessertsPageContext.Provider>
    )
}

export const useDesserts = () => {
    const ctx = useContext(DessertsPageContext)

    if (!ctx) {
        throw new Error('useDessert cannot be used outside the DessertsPageContextProvider')
    }

    return ctx
}