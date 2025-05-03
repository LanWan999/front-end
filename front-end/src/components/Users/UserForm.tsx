import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getUser, updateUser } from '../../api/users';
import { User } from '../../types/users';
import axios from 'axios';

function UserForm() {
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    age: undefined,
    bio: '',
    avatar: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!id || !/^[a-f\d]{24}$/i.test(id)) {
      navigate('/users');
      return;
    }

    getUser(id)
      .then(res => {
        setFormData({ ...res.data, password: '' });
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        navigate('/users');
      });
  }, [id, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (id) {
        const updates = { ...formData };
        if (!updates.password) {
          delete updates.password;
        }
        await updateUser(id, updates as User);
        navigate(`/users/${id}`);
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors({ ...errors, server: error.response?.data.message });
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
          <div className="user-form">
            <h2>Edit User</h2>
            {errors.server && <div className="error">{errors.server}</div>}
            <form onSubmit={handleSubmit}>
            
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div>
          <label>Surname:</label>
          <input
            type="text"
            value={formData.surname || ''}
            onChange={e => setFormData({ ...formData, surname: e.target.value })}
          />
          {errors.surname && <span className="error">{errors.surname}</span>}
        </div>

        <div>
          <label>Username:</label>
          <input
            type="text"
            value={formData.username || ''}
            onChange={e => setFormData({ ...formData, username: e.target.value })}
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={formData.password || ''}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            min="0"
            value={formData.age || ''}
            onChange={e => setFormData({ ...formData, age: +e.target.value })}
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        <div>
          <label>Bio:</label>
          <textarea
            value={formData.bio || ''}
            onChange={e => setFormData({ ...formData, bio: e.target.value })}
          />
          {errors.bio && <span className="error">{errors.bio}</span>}
        </div>

        <div>
          <label>Avatar URL:</label>
          <input
            type="url"
            value={formData.avatar || ''}
            onChange={e => setFormData({ ...formData, avatar: e.target.value })}
          />
          {errors.avatar && <span className="error">{errors.avatar}</span>}
        </div>


              <button type="submit">Update</button>
            </form>
          </div>
        );
      }

export default UserForm;
