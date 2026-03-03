import { useState, useRef } from 'react'
import axiosInstance from '../api/AxiosInstance'

function TestAPI() {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  // const [token, setToken] = useState(localStorage.getItem('authToken') || '')
  const [inputTitle, setInputTitle] = useState('')
  const [inputBody, setInputBody] = useState('')
  
  // AbortController for request cancellation
  const abortControllerRef = useRef(null)

  // Save token to localStorage
//   const handleSaveToken = () => {
//     localStorage.setItem('authToken', token)
//     alert('Token saved to localStorage!')
//   }

  // Make POST request
  const handlePostRequest = async () => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new AbortController
    abortControllerRef.current = new AbortController()

    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const result = await axiosInstance.post(
        '/posts', // Endpoint
        {
          // POST request body
          title: inputTitle,
          body: inputBody,
          userId: 1
        },
        {
          // Axios config
          signal: abortControllerRef.current.signal
        }
      )

      setResponse(result.data)
      console.log('✅ POST Response:', result.data)

      // Example: Redirect if needed
      if (result.data.id) {
        console.log('🔗 Could redirect to:', `/posts/${result.data.id}`)
        // Uncomment to actually redirect:
        // window.location.href = `/posts/${result.data.id}`
        // Or with React Router:
        // navigate(`/posts/${result.data.id}`)
      }

    } catch (err) {
      if (err.name === 'CanceledError') {
        console.log('🚫 Request was cancelled')
        setError('Request was cancelled')
      } else {
        console.error('❌ Error:', err)
        setError(err.message || 'An error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  // Cancel ongoing request
  const handleCancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      console.log('🚫 Request cancelled by user')
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Axios API Test</h2>

      {/* Token Input */}
      {/* <div className="mb-6 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">Authentication Token</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter auth token (optional)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSaveToken}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Token
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Token will be added to request headers automatically
        </p>
      </div> */}

      {/* Post Content Inputs */}
      <div className="mb-6 p-4 bg-purple-50 rounded">
        <h3 className="font-semibold mb-2">Post Content</h3>
        <div className="space-y-3">
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <textarea
            value={inputBody}
            onChange={(e) => setInputBody(e.target.value)}
            placeholder="Enter post body"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Request Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handlePostRequest}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded"
        >
          {loading ? 'Loading...' : 'Send POST Request'}
        </button>
        
        {loading && (
          <button
            onClick={handleCancelRequest}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Cancel Request
          </button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Response Display */}
      {response && (
        <div className="mb-4 p-4 bg-green-50 border border-green-400 rounded">
          <h3 className="font-semibold mb-2 text-green-800">✅ Response:</h3>
          <pre className="text-sm bg-white p-3 rounded overflow-auto max-h-64">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

    </div>
  )
}

export default TestAPI