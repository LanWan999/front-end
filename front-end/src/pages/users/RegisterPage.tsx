import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/usersApi'

interface ApiError {
  response?: {
    data?: {
      message: string;
    };
  };
}

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    try {
      await registerUser(username, email, password); 
      navigate('/login');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.message || 'Registration failed');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Username" />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" />
      <button type="submit">Register</button>
      {error && <div style={{color: 'red'}}>{error}</div>}
    </form>
  );
};

export default RegisterPage;
