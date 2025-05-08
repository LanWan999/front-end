import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Capybara } from '../../types/capybara'
import api from '../../api'
import styles from './CapybarasPage.module.scss'
import { Review } from '../../types/review'
import ReviewForm from '../../forms/ReviewForm'


const CapybarasPage = () => {

    const [ capybaras, setCapybaras ] = useState<Capybara[] | null>(null)

    const [reviews, setReviews] = useState<Review[]>([])

    useEffect(() => {
        const fetchCapybaras = async () => {

            const { data } = await api(`/capybaras`)
            setCapybaras(data)
        }

        fetchCapybaras()
    }, [])


    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const { data } = await api.get('/reviews')
          setReviews(data)
        } catch (err) {
          console.error('Failed to fetch reviews:', err)
        }
      }

      fetchReviews()
    }, [])


    if (!capybaras) {
        return 'Loading...'
    }

    if (capybaras.length === 0) {
        return <div>No capybaras found</div>
    }

    return (
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Meet our Capybaras</h1>
        <div className={styles.grid}>
          {capybaras.map((capybara) => (
            <div key={capybara._id} className={styles.card}>
              <img src={capybara.image} alt={capybara.name} className={styles.image} />
              <Link to={`/capybaras/${capybara._id}`} className={styles.name}>
                {capybara.name}
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.reviewsSection}>
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              <ul className={styles.reviewList}>
                <h1>Reviews</h1>
                {reviews.map((review) => (
                  <li key={review._id} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      <span className={styles.username}>  Username: {typeof review.username === 'object' && 'username' in review.username ? review.username.username : 'Unknown'}</span>
                      <span className={styles.favorite}>
                        Favorite Capybara: {typeof review.favoriteCapybara === 'object' && 'name' in review.favoriteCapybara ? review.favoriteCapybara.name : 'Unknown'}
                      </span>
                      <div className={styles.reviewBody}>Review: "{review.body}"</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
        </div>
        <h3>Leave a review</h3>
        <div>
          <ReviewForm />
        </div>
      </div>
      
    );
}
export default CapybarasPage