// src/api/axios.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9000',  // Update with your backend URL
  headers: {
    'Content-Type': 'application/json',  // Set headers (optional)
  },
});

export default api;
