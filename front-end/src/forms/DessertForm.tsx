import React, { useState } from 'react'
import { Dessert, useDesserts } from '../contexts/DessertContext'
import { useEffect } from 'react'

type DessertsFormProps = {
    editDessertData?: Dessert
}

const DessertsForm: React.FC<DessertsFormProps> = (props) => {
    const { editDessertData } = props

    const { addDessert, editDessert } = useDesserts()

    const [image, setImage] = useState(editDessertData?.image ?? '')
    const [name, setName] = useState(editDessertData?.name ?? '')
    const [price, setPrice] = useState(editDessertData?.price ?? '')
    const [description, setDescription] = useState(editDessertData?.description ?? '')

    const [formError, setFormError] = useState('')

    const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => setImage(event.target.value)
    const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)
    const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => setPrice (Number(event.target.value))
    const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)

    useEffect(() => {
        if (editDessertData) {
            setImage(editDessertData.image ?? '')
            setName(editDessertData.name ?? '')
            setPrice(editDessertData.price ?? '')
            setDescription(editDessertData.description ?? '')
        }
    }, [editDessertData])


    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault()

        setFormError('')

        if (!image || !name || !price || !description) {
            setFormError('Form is invalid')
            return
        }

        const dessertData = {
            image,
            name,
            price: typeof price === 'string' ? parseFloat(price) : price,
            description
        }

        if (editDessertData) {
            const updatedDessertData = { ...dessertData, id: editDessertData.id}
            editDessert(updatedDessertData)
        } else {
            const newDessertData = { ...dessertData, id: Date.now().toString() }
            addDessert(newDessertData)
        }

    }

    return(
        <div>
            <h1>Add dessert</h1>
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

                <button className='button-style' type='submit'>{editDessertData ? "Edit Dessert" : 'Add Dessert'}</button>

                {formError && <p>{formError}</p>}
            </form>
        </div>
    )
}
export default DessertsForm