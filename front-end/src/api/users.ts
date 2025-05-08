import axios from 'axios';
import { User } from '../types/users';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getUsers = () => api.get<User[]>('/users');
export const getUser = (id: string) => api.get<User>(`/users/${id}`);
export const registerUser = (user: Omit<User, '_id'>) => 
  api.post<User>('/users/register', user);
export const updateUser = (id: string, user: Partial<User>) => 
  api.put<User>(`/users/${id}`, user);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);
export const changeUserRole = (id: string, role: 'USER' | 'ADMIN' ) => 
  api.patch<User>(`/users/${id}/role`, { role });
