import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getUser, deleteUser } from '../../api/users';
import { User } from '../../types/users'
import { jwtDecode } from 'jwt-decode';

function UserPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const currentUser: { id?: string; role?: string } = token ? jwtDecode(token) : {};
  const isAdmin = currentUser?.role === 'ADMIN';
  const isModerator = currentUser?.role === 'MODERATOR';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(id!);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        navigate('/users');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id!);
      navigate('/users');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-page">
      <div className="user-header">
        <img src={user.avatar} alt="Avatar" className="avatar" />
        <h1>{user.name} {user.surname}</h1>
        <p className="username">@{user.username}</p>
      </div>

      <div className="user-details">
        <p><strong>Email:</strong> {user.email}</p>
        {user.age && <p><strong>Age:</strong> {user.age}</p>}
        {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}

        {isAdmin || isModerator && <p><strong>Role:</strong> {user.role}</p>}
      </div>

    
        <div className="user-actions">
                  {user._id === currentUser?.id && (
            <Link to={`/edit/${user._id}`} className="btn-edit">
              Edit
            </Link>
          )}
          {isAdmin && (
            <button onClick={handleDelete} className="btn-delete">Delete User</button>
          )}
        </div>
      
    </div>
  );
}

export default UserPage;
