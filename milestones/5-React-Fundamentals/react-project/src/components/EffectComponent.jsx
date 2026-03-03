import { useEffect, useState } from "react"


function EffectComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log("✅ EffectComponent mounted!")
    
    return () => {
      console.log("❌ EffectComponent unmounted!")
    }
  }, []) 

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/userData.json')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const result = await response.json()
      setData(result)
      console.log("📦 Data fetched successfully:", result)
    } catch (err) {
      setError(err.message)
      console.error("❗ Error fetching data:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Effect Component</h2>
      
      <button 
        onClick={fetchData}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {data && (
        <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
          <h3 className="font-semibold text-lg mb-2">User Data:</h3>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
          <p>
            <strong>GitHub:</strong>{' '}
            <a 
              href= {`https://github.com/${data.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {data.github}
            </a>
          </p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>💡 Check the console to see mount/unmount logs!</p>
      </div>
    </div>
  )
}

export default EffectComponent