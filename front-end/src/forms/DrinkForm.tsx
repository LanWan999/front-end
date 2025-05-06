import React, { useState } from 'react'
import { Drink, useDrinks } from '../contexts/DrinkContext'
import { useEffect } from 'react'

type DrinksFormProps = {
    editDrinkData?: Drink
}

const DrinksForm: React.FC<DrinksFormProps> = (props) => {
    const { editDrinkData } = props

    const { addDrink, editDrink } = useDrinks()

    const [image, setImage] = useState(editDrinkData?.image ?? '')
    const [name, setName] = useState(editDrinkData?.name ?? '')
    const [price, setPrice] = useState(editDrinkData?.price ?? '')
    const [description, setDescription] = useState(editDrinkData?.description ?? '')

    const [formError, setFormError] = useState('')

    const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => setImage(event.target.value)
    const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)
    const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => setPrice (Number(event.target.value))
    const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)

    useEffect(() => {
        if (editDrinkData) {
            setImage(editDrinkData.image ?? '')
            setName(editDrinkData.name ?? '')
            setPrice(editDrinkData.price ?? '')
            setDescription(editDrinkData.description ?? '')
        }
    }, [editDrinkData])


    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault()

        setFormError('')

        if (!image || !name || !price || !description) {
            setFormError('Form is invalid')
            return
        }

        const drinkData = {
            image,
            name,
            price: typeof price === 'string' ? parseFloat(price) : price,
            description
        }

        if (editDrinkData) {
            const updatedDessertData = { ...drinkData, id: editDrinkData.id}
            editDrink(updatedDessertData)
        } else {
            const newDessertData = { ...drinkData, id: Date.now().toString() }
            addDrink(newDessertData)
        }

    }

    return(
        <div>
            <h1>Add drink</h1>
            <form onSubmit={formSubmitHandler}>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="text" name="image" id="image" value={image} onChange={imageHandler}/>
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" value={name} onChange={nameHandler}/>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="number" name="price" id="price" value={price} onChange={priceHandler}/>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" id="description" value={description} onChange={descriptionHandler}/>
                </div>

                <button className='button-style' type='submit'>{editDrinkData ? "Edit Drink" : 'Add Drink'}</button>

                {formError && <p>{formError}</p>}
            </form>
        </div>
    )
}
export default DrinksForm