import React, { useEffect, useState } from 'react'
import api from '../api'
import { Drink } from '../types/drink'

type DrinksFormProps = {
  editDrinkData?: Drink
}

const DrinksForm: React.FC<DrinksFormProps> = ({ editDrinkData }) => {
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState<string>('')
  const [description, setDescription] = useState('')
  const [drinkId, setDrinkId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editDrinkData) {
      setDrinkId(editDrinkData._id) 
      setImage(editDrinkData.image)
      setName(editDrinkData.name)
      setPrice(editDrinkData.price?.toString() ?? '')
      setDescription(editDrinkData.description)
    }
  }, [editDrinkData])

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value)
  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)
  const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name || !description || !image || price === '') {
      setError('All fields are required')
      return
    }

    const drinkData = {
      image,
      name,
      price: parseFloat(price),
      description,
    }

    try {
      if (editDrinkData) {
        await api.put(`/drinks/${drinkId}`, drinkData)
        console.log('Drink updated successfully')
      } else {
        await api.post(`/drinks`, drinkData)
        console.log('Drink created successfully')
      }
    } catch (err) {
      console.error('Error saving drink:', err)
      setError('Failed to save drink')
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="image">Image:</label>
          <input type="text" id="image" value={image} onChange={imageHandler} />
        </div>
        <div className="form-control">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={nameHandler} />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" value={price} onChange={priceHandler} />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={description} onChange={descriptionHandler} />
        </div>
        <button type="submit">Update Drink</button>
        
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default DrinksForm