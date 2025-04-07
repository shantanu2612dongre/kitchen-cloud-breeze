
import axios from 'axios';
import { MenuItem } from '../data/menuData';
import { Order } from '../data/orderData';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with actual Django API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication service
export const authService = {
  login: async (email: string, password: string) => {
    // In a real app, would call: return api.post('/auth/login/', { email, password });
    // For demo purposes, we'll simulate a successful login
    const mockResponse = { token: 'sample-token-123', user: { id: 1, name: 'Demo User', email } };
    localStorage.setItem('token', mockResponse.token);
    localStorage.setItem('user', JSON.stringify(mockResponse.user));
    return mockResponse;
  },
  
  register: async (name: string, email: string, password: string) => {
    // In a real app, would call: return api.post('/auth/register/', { name, email, password });
    // For demo purposes, we'll simulate a successful registration
    const mockResponse = { token: 'sample-token-123', user: { id: 1, name, email } };
    localStorage.setItem('token', mockResponse.token);
    localStorage.setItem('user', JSON.stringify(mockResponse.user));
    return mockResponse;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// Menu service
export const menuService = {
  getMenuItems: async (): Promise<MenuItem[]> => {
    // In a real app, would call: return api.get('/menu/');
    // Import mock data for demo
    const { menuItems } = await import('../data/menuData');
    return new Promise((resolve) => {
      setTimeout(() => resolve(menuItems), 500); // Add delay to simulate API call
    });
  },
  
  getMenuItem: async (id: number): Promise<MenuItem | undefined> => {
    // In a real app, would call: return api.get(`/menu/${id}/`);
    const { menuItems } = await import('../data/menuData');
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = menuItems.find(item => item.id === id);
        resolve(item);
      }, 300);
    });
  }
};

// Order service
export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    // In a real app, would call: return api.get('/orders/');
    const { orderHistory } = await import('../data/orderData');
    return new Promise((resolve) => {
      setTimeout(() => resolve(orderHistory), 500);
    });
  },
  
  getOrder: async (id: number): Promise<Order | undefined> => {
    // In a real app, would call: return api.get(`/orders/${id}/`);
    const { orderHistory } = await import('../data/orderData');
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = orderHistory.find(order => order.id === id);
        resolve(order);
      }, 300);
    });
  },
  
  createOrder: async (orderData: any) => {
    // In a real app, would call: return api.post('/orders/', orderData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.floor(1000 + Math.random() * 9000),
          date: new Date().toISOString(),
          ...orderData,
          status: 'In Progress'
        });
      }, 800);
    });
  }
};

export default api;
