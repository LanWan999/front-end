import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import { Drink } from '../../types/drink'
import { Dessert } from '../../types/dessert'

type UserFormProps = {
  editUserData?: {
    _id?: string;
    name: string;
    surname: string;
    username: string;
    email: string;
    age: number;
    bio: string;
    avatar: string;
    favoriteDrink: string;
    favoriteDessert: string;
  };
};


const UserForm: React.FC<UserFormProps> = ({ editUserData }) => {
  const [name, setName] = useState(editUserData?.name ?? '');
  const [surname, setSurname] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [age, setAge] = useState(editUserData?.age ?? '');
  const [bio, setBio] = useState<string>('')
  const [avatar, setAvatar] = useState<string>('')

  const [favoriteDrink, setFavoriteDrink] = useState<string>('')
  const [favoriteDessert, setFavoriteDessert] = useState<string>('')

  const [availableDrinks, setAvailableDrinks] = useState<Drink[]>([]) 
  const [availableDesserts, setAvailableDesserts] = useState<Dessert[]>([]) 

  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (editUserData) {
      setName(editUserData.name);
      setSurname(editUserData.surname);
      setUsername(editUserData.username);
      setEmail(editUserData.email);
      setAge(editUserData.age);
      setBio(editUserData.bio);
      setAvatar(editUserData.avatar);
      setFavoriteDrink(editUserData.favoriteDrink);
      setFavoriteDessert(editUserData.favoriteDessert);
    }
  }, [editUserData]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const drinksResponse = await api.get('/drinks') 
        const dessertsResponse = await api.get('/desserts') 

        setAvailableDrinks(drinksResponse.data)
        setAvailableDesserts(dessertsResponse.data)
      } catch (err) {
        console.error('Error fetching available items:', err)
      }
    }
    fetchItems()
  }, [])

  const handleStringInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value)
    }

  const handleNumberInputChange = (setter: React.Dispatch<React.SetStateAction<number | string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value === '' ? '' : Number(e.target.value)) 
    }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name || !surname || !username || !email || age === '' || !avatar || !favoriteDrink || !favoriteDessert) {
      setError('All fields are required')
      return
    }

    const userData = {
      name,
      surname,
      username,
      email,
      password,
      age: Number(age),
      bio,
      avatar,
      favoriteDrink, 
      favoriteDessert 
    }

    try {
      setLoading(true);
      
      const response = await api.post('/users', userData);  
      console.log('User created successfully:', response.data);
      navigate('/users'); 
    } catch (error) {
      console.error('Registration failed:', error);
      setError('An error occurred while creating the user');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleStringInputChange(setName)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={handleStringInputChange(setSurname)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleStringInputChange(setUsername)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleStringInputChange(setEmail)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleStringInputChange(setPassword)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={handleNumberInputChange(setAge)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            id="bio"
            value={bio}
            onChange={handleStringInputChange(setBio)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="avatar">Avatar URL:</label>
          <input
            type="text"
            id="avatar"
            value={avatar}
            onChange={handleStringInputChange(setAvatar)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="favoriteDrink">Favorite Drink:</label>
          <select
            id="favoriteDrink"
            value={favoriteDrink}
            onChange={(e) => setFavoriteDrink(e.target.value)}
          >
            <option value="">Select a drink</option>
            {availableDrinks.map((drink) => (
              <option key={drink._id} value={drink._id}>
                {drink.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="favoriteDessert">Favorite Dessert:</label>
          <select
            id="favoriteDessert"
            value={favoriteDessert}
            onChange={(e) => setFavoriteDessert(e.target.value)}
          >
            <option value="">Select a dessert</option>
            {availableDesserts.map((dessert) => (
              <option key={dessert._id} value={dessert._id}>
                {dessert.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">{editUserData ? 'Update User' : 'Create User'}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default UserForm
