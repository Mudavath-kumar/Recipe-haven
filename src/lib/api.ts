// Use fetch API instead of axios
// import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Helper function for fetch requests
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    console.log(`Making request to ${API_URL}${url}`, { method: options.method || 'GET' });
    
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers
    });
    
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    if (!response.ok) {
      let errorData;
      if (isJson) {
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: 'Could not parse error response' };
        }
      } else {
        const text = await response.text();
        errorData = { message: text || `HTTP error ${response.status}` };
      }
      
      console.error('API request failed:', {
        status: response.status,
        url: `${API_URL}${url}`,
        errorData
      });
      
      const error: any = new Error(errorData.message || `HTTP error ${response.status}`);
      error.response = { status: response.status, data: errorData };
      throw error;
    }
    
    // If response is 204 No Content or not JSON, return empty object
    if (response.status === 204 || !isJson) {
      return {};
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// Authentication service
export const authService = {
  // Register a new user
  register: async (name: string, email: string, password: string) => {
    console.log('Registering user:', { name, email });
    const data = await fetchWithAuth('/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  },

  // Login user
  login: async (email: string, password: string) => {
    const data = await fetchWithAuth('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },

  // Get user profile
  getUserProfile: async () => {
    return fetchWithAuth('/users/profile');
  },

  // Update user profile
  updateProfile: async (userData: Record<string, any>) => {
    const data = await fetchWithAuth('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
    
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  }
};

// Export default api with common HTTP methods
export default {
  get: (url: string) => fetchWithAuth(url),
  post: (url: string, data: any) => fetchWithAuth(url, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  put: (url: string, data: any) => fetchWithAuth(url, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (url: string) => fetchWithAuth(url, {
    method: 'DELETE'
  })
}; 