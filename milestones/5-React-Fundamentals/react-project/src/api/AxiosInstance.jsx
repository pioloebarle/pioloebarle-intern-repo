import axios from 'axios'

// Generate a unique request ID
const generateRequestId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

// Create Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Change to your API base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*',
  }
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Generate and attach request ID
    config.headers['X-Request-ID'] = generateRequestId()
    
    // Retrieve auth token from localStorage
    // const token = localStorage.getItem('authToken')
    
    // Attach token to headers if available
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`
    // }
    
    console.log('📤 Request:', config.method?.toUpperCase(), config.url)
    console.log('🆔 Request ID:', config.headers['X-Request-ID'])
    
    return config
  },
  (error) => {
    // Handle request errors
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor (optional - for handling responses globally)
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      // Server responded with error status
      console.error('❌ Response Error:', error.response.status, error.response.data)
    } else if (error.request) {
      // Request made but no response
      console.error('❌ No Response:', error.request)
    } else {
      // Something else happened
      console.error('❌ Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance