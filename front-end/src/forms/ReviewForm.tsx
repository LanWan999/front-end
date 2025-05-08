import React, { useReducer, useEffect, useState } from 'react'
import api from '../api'
import { reviewFormReducer, initialState as reducerInitialState } from '../contexts/reducers/ReviewReducer'
import { Capybara } from '../types/capybara'
import axios from 'axios'

type ReviewFormProps = {
  editReviewData?: {
    _id: string
    username: string
    body: string
    favoriteCapybara: string
  }
  onSuccess?: () => void
}

const ReviewForm: React.FC<ReviewFormProps> = ({ editReviewData, onSuccess }) => {
  const [state, dispatch] = useReducer(reviewFormReducer, reducerInitialState)
  const [reviewId, setReviewId] = useState<string | null>(null)
  const [capybaras, setCapybaras] = useState<Capybara[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (editReviewData) {
      setReviewId(editReviewData._id)
      dispatch({ type: 'SET_USERNAME', payload: editReviewData.username })
      dispatch({ type: 'SET_BODY', payload: editReviewData.body })
      dispatch({ type: 'SET_FAVORITECAPYBARA', payload: editReviewData.favoriteCapybara })
    }
  }, [editReviewData])

  useEffect(() => {
    const fetchCapybaras = async () => {
      try {
        const { data } = await api.get('/capybaras')
        setCapybaras(data)
      } catch (err) {
        console.error('Failed to fetch capybaras:', err)
      }
    }

    fetchCapybaras()
  }, [])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      dispatch({ type: 'SET_USERNAME', payload: user.username });
    }
  }, []);
  

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'SET_USERNAME', payload: e.target.value })

  const bodyHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatch({ type: 'SET_BODY', payload: e.target.value })

  const capybaraHandler = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch({ type: 'SET_FAVORITECAPYBARA', payload: e.target.value })

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!state.body || !state.favoriteCapybara) {
      setError('All fields are required');
      return;
    }
  
    const newReview = {
      body: state.body,
      favoriteCapybara: state.favoriteCapybara,
    };
  
    try {
      if (editReviewData && reviewId) {
        await api.put(`/reviews/${reviewId}`, newReview);
        console.log('Review updated successfully');
      } else {
        await api.post(`/reviews`, newReview);
        console.log('Review created successfully');
      }
  
      dispatch({ type: 'SET_BODY', payload: '' });
      dispatch({ type: 'SET_FAVORITECAPYBARA', payload: '' });
      setReviewId(null);
      setError('');
  
      if (onSuccess) onSuccess();
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error saving review:', err.message);
      } else if (axios.isAxiosError(err)) {
        console.error('Error saving review:', err.response?.data || err.message);
      } else {
        console.error('Unexpected error:', err);
      }
    
      setError('Failed to save review');
    }
    
  };
  

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-control">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={state.username} onChange={usernameHandler} />
        </div>
        <div className="form-control">
          <label htmlFor="body">Review:</label>
          <textarea id="body" value={state.body} onChange={bodyHandler}></textarea>
        </div>
        <div className="form-control">
          <label htmlFor="favoriteCapybara">Favorite Capybara:</label>
          <select id="favoriteCapybara" value={state.favoriteCapybara} onChange={capybaraHandler}>
            <option value="">-- Select a Capybara --</option>
            {capybaras.map((capybara) => (
              <option key={capybara._id} value={capybara._id}>
                {capybara.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{editReviewData ? 'Update Review' : 'Submit Review'}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default ReviewForm
