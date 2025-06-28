import express from 'express';
import axios from 'axios';
import config from '../config/env.js';

const router = express.Router();

// Auth0 Management API endpoints
const AUTH0_DOMAIN = 'dev-xxxcc1cbz2oysh2g.us.auth0.com'; // Hardcoded for testing - replace with your actual domain
const AUTH0_CLIENT_ID = '8zHAesUK7NbsG3z05mEOqIzirjIGO7vd'; // Hardcoded for testing
const AUTH0_CLIENT_SECRET = 'vsEMNJnotY1tFDc-i0zr6wRxQSH-FQJ5kGeBky0_xQDNuvU-eBmFacwf1WHRavMM'; // Hardcoded for testing

// Get Auth0 Management API token
const getManagementToken = async () => {
  try {
    const tokenRequest = {
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      audience: `https://${AUTH0_DOMAIN}/api/v2/`,
      grant_type: 'client_credentials'
    };
    
    const response = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, tokenRequest);
    return response.data.access_token;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Invalid Auth0 credentials. Please check your Client ID and Client Secret.');
    } else if (error.response?.status === 403) {
      throw new Error('Access denied. Please check your Auth0 application permissions.');
    } else if (!AUTH0_CLIENT_SECRET) {
      throw new Error('Auth0 Client Secret is missing. Please add AUTH0_CLIENT_SECRET to your .env file.');
    } else {
      throw new Error(`Failed to get management token: ${error.response?.data?.error_description || error.message}`);
    }
  }
};

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Email, password, and name are required'
      });
    }
    
    if (password.length < 8) {
      return res.status(400).json({
        error: 'Password too short',
        message: 'Password must be at least 8 characters long'
      });
    }
    
    // Get management token
    const managementToken = await getManagementToken();
    
    // Create user in Auth0
    const userData = {
      email: email,
      password: password,
      name: name,
      connection: 'Username-Password-Authentication', // Your Auth0 database connection
      email_verified: false
    };
    
    const response = await axios.post(
      `https://${AUTH0_DOMAIN}/api/v2/users`,
      userData,
      {
        headers: {
          'Authorization': `Bearer ${managementToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.status(201).json({
      message: 'User created successfully',
      userId: response.data.user_id,
      email: response.data.email
    });
    
  } catch (error) {
    if (error.response?.status === 409) {
      return res.status(409).json({
        error: 'User already exists',
        message: 'A user with this email already exists'
      });
    }
    
    res.status(500).json({
      error: 'Registration failed',
      message: error.response?.data?.message || error.message
    });
  }
});

// Login user (get access token)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing credentials',
        message: 'Email and password are required'
      });
    }
    
    // Get management token first
    const managementToken = await getManagementToken();
    
    // Find user by email using Management API
    const searchUrl = `https://${AUTH0_DOMAIN}/api/v2/users-by-email?email=${encodeURIComponent(email)}`;
    
    const usersResponse = await axios.get(searchUrl, {
      headers: {
        'Authorization': `Bearer ${managementToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!usersResponse.data || usersResponse.data.length === 0) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }
    
    const user = usersResponse.data[0];
    
    // For now, return a success response with user info
    // In a production app, you'd want to implement proper password verification
    res.json({
      message: 'Login successful',
      user_id: user.email,
      email: user.email,
      name: user.name
    });
    
  } catch (error) {
    if (error.response?.status === 401) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }
    
    res.status(500).json({
      error: 'Login failed',
      message: error.response?.data?.message || error.message
    });
  }
});

export default router; 