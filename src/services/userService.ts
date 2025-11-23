import axios from 'axios';
import type { CreateUserRequest, User } from '../types/user.types.ts';

const API_BASE_URL = 'https://ts1c4pdn7j.execute-api.us-east-1.amazonaws.com/Stage';

export const userService = {
  createUser: async (userData: CreateUserRequest): Promise<User> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to create user: ${error.response?.statusText || error.message}`);
      }
      throw error;
    }
  },

  fetchUser: async (userId: string): Promise<User> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch user: ${error.response?.statusText || error.message}`);
      }
      throw error;
    }
  },
};