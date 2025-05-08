import React from 'react'
import { useEffect, useState } from "react"
import api from '../api'

type CapybaraFormProps = {
    editCapybaraData?: { 
        _id: string;
        image: string
        name: string
        personality: string
        favoriteSnack: string
        description: string
    }
}

function CapybaraForm(props: CapybaraFormProps) {
    const { editCapybaraData } = props

    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [personality, setPersonality] = useState('')
    const [favoriteSnack, setFavoriteSnack] = useState('')
    const [description, setDescription] = useState('')
    const [capybaraId, setCapybaraId] =useState<string | null>(null)

    const [error, setError] = useState('')

    useEffect(() => {

        if (editCapybaraData) {
            console.log('editing')

            setCapybaraId(editCapybaraData._id)
            setImage(editCapybaraData.image)
            setName(editCapybaraData.name)
            setPersonality(editCapybaraData.personality)
            setFavoriteSnack(editCapybaraData.favoriteSnack)
            setDescription(editCapybaraData.description)
        } else {
            setImage('')
            setName('')
            setPersonality('')
            setFavoriteSnack('')
            setDescription('')
        }

    }, [editCapybaraData])
    
    const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => setImage(event.target.value)
    const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)
    const personalityHandler = (event: React.ChangeEvent<HTMLInputElement>) => setPersonality(event.target.value)
    const favoriteSnackHandler = (event: React.ChangeEvent<HTMLInputElement>) => setFavoriteSnack(event.target.value)
    const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(!name || !description) {
            setError('Title and body is required')
            return
        }

        const newCapybara = {
            image,
            name,
            personality,
            favoriteSnack,
            description
        }

        

        if (editCapybaraData) {
            api.put(`/capybaras/${capybaraId}`, newCapybara)
            console.log('Capybara updated successfully')
        } else {
            api.post(`/capybaras`, newCapybara)
            console.log('Capybara created successfully')
        }
    }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <div className='form-control'>
                    <label htmlFor="image">Image:</label>
                    <input type="text" name="image" id="image"  value={image} onChange={imageHandler}/>
                </div>
                <div className='form-control'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name"  value={name} onChange={nameHandler}/>
                </div>
                <div className='form-control'>
                    <label htmlFor="personality">personality:</label>
                    <input type="text" name="personality" id="personality"  value={personality} onChange={personalityHandler}/>
                </div>
                <div className='form-control'>
                    <label htmlFor="favoriteSnack">favoriteSnack:</label>
                    <input type="text" name="favoriteSnack" id="favoriteSnack"  value={favoriteSnack} onChange={favoriteSnackHandler}/>
                </div>
                <div className='form-control'>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" id="description"  value={description} onChange={descriptionHandler}/>
                </div>
                <button type='submit'>Add Capybara</button>

                {error && <p>{error}</p>}
            </form>
        </div>
    )
}
export default CapybaraForm