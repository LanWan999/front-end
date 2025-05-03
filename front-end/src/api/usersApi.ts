// src/api/userApi.ts
import api from '../api';
import { User } from '../types/users';


export type { User }

export const getAllUsers = () => api.get<User[]>('/users');

// Fetch all users (protected endpoint)
export const getUsers = () => api.get<User[]>('/users');

// Fetch a specific user by ID (protected endpoint)
export const getUser = (id: string) => api.get<User>(`/users/${id}`);

// Register a new user
export const registerUser = async (username: string, email: string, password: string) => {
  const res = await api.post('/users/register', { username, email, password });
  return res.data;
};

export const updateUserRole = (id: string, role: 'USER' | 'ADMIN' | 'MODERATOR') => {
  return api.patch<User>(`/users/${id}/role`, { role });
};

// Login user: Handles the login flow, retrieves token and stores it
export const loginUser = async (email: string, password: string): Promise<string | null> => {
  console.log('API request made with:', email, password)
  const res = await api.post('/users/login', { email, password });
  console.log('API response:', res.data)
  const token = res.data.token;
  if (token) {
    localStorage.setItem('token', token); // Store token on successful login
  }
  return token; // Return the token
};

export const deleteUser = (id: string) => api.delete(`/users/${id}`);