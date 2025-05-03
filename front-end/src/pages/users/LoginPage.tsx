import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

console.log('LoginPage rendered')

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit triggered')
    e.preventDefault();
    console.log('After preventDefault')
    console.log('Form submitted with:', email, password)
    setError(null);

    try {
      await login(email, password); 
      navigate('/'); 
    } catch (err) {

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => {
            setEmail(e.target.value);
            console.log('Email updated:', e.target.value);
        }}
        required
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => {
            setPassword(e.target.value);
            console.log('Password updated:', e.target.value);
        }}
        required
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default LoginPage;
