import api from '../api';
import { User } from '../types/users';

export const getAllUsers = () => api.get<User[]>('/users');

export const getUsers = () => api.get<User[]>('/users');

export const getUser = (id: string) => api.get<User>(`/users/${id}`);

export const registerUser = async (username: string, email: string, password: string) => {
  const res = await api.post('/users/register', { username, email, password });
  return res.data;
};

export const updateUserRole = (id: string, role: 'USER' | 'ADMIN') => {
  return api.put<User>(`/users/${id}/role`, { role });
};

export const loginUser = async (email: string, password: string): Promise<string | null> => {
  console.log('API request made with:', email, password)
  const res = await api.post('/users/login', { email, password });
  console.log('API response:', res.data)
  const token = res.data.token;
  if (token) {
    localStorage.setItem('token', token); 
  }
  return token; 
};

export const deleteUser = (id: string) => api.delete(`/users/${id}`);