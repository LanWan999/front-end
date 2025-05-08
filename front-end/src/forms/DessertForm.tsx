import React, { useState, useEffect } from 'react'
import api from '../api'
import { Dessert } from '../types/dessert'

type DessertsFormProps = {
  editDessertData?: Dessert
}

const DessertsForm: React.FC<DessertsFormProps> = ({ editDessertData }) => {
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState<string>('')
  const [description, setDescription] = useState('')
  const [dessertId, setDessertId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editDessertData) {
      setDessertId(editDessertData._id)
      setImage(editDessertData.image)
      setName(editDessertData.name)
      setPrice(editDessertData.price?.toString() ?? '')
      setDescription(editDessertData.description)
    }
  }, [editDessertData])

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

    const dessertData = {
      image,
      name,
      price: parseFloat(price),
      description,
    }

    try {
      if (editDessertData) {
        api.put(`/desserts/${dessertId}`, dessertData)
        console.log('Dessert updated successfully')
      } else {
        await api.post(`/desserts`, dessertData)
        console.log('Dessert created successfully')
      }
    } catch (err) {
      console.error('Error saving dessert:', err)
      setError('Failed to save dessert')
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
        <button type="submit">Update Dessert</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default DessertsForm