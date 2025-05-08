import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser } from '../../api/users';
import { User } from '../../types/users'
import { jwtDecode } from 'jwt-decode';
import styles from './UserPage.module.scss';

function UserPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const decodedUser: { id?: string; role?: string } = token ? jwtDecode(token) : {};
  const isAdmin = decodedUser?.role === 'ADMIN';

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); 
      try {
        if (id) {
          
          const response = await getUser(id);
          console.log('Fetched User:', response.data);
          setUser(response.data);
        } else {
          
          navigate('/users');
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        navigate('/users'); 
      } finally {
        setLoading(false); 
      }
    };
  
    fetchUserData();
  }, [id, navigate]); 

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className={styles.userPage}>
      <div className={styles.userHeader}>
        <img className={styles.avatar} src={user.avatar} alt="Avatar"/>
        <h1 className={styles.userName}>{user.name} {user.surname}</h1>
        <p className={styles.username}>@{user.username}</p>
      </div>

      <div className={styles.userInfo}>
        <p><strong>Email:</strong> {user.email}</p>
        {user.age && <p><strong>Age:</strong> {user.age}</p>}
        {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
        {isAdmin && <p><strong>Role:</strong> {user.role}</p>}
      </div>

      {user.favoriteDessert && (
        <div className={styles.favoriteDessert}>
          <h3>Favorite Dessert</h3>
          <img className={styles.dessertImage} src={user.favoriteDessert.image} alt={user.favoriteDessert.name} />
          <p><strong>{user.favoriteDessert.name}</strong></p>
        </div>
      )}

      {user.favoriteDrink && (
        <div className={styles.favoriteDrink}>
          <h3>Favorite Drink</h3>
          <img className={styles.drinkImage} src={user.favoriteDrink.image} alt={user.favoriteDrink.name} />
          <p><strong>{user.favoriteDrink.name}</strong></p>
        </div>
      )}
    </div>
  );
}

export default UserPage;