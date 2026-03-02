import { useState, useMemo } from 'react'

// Expensive calculation: Find all prime numbers
const findPrimes = (numberList) => {
  console.log('🔥 Running expensive calculation...')
  
  const isPrime = (num) => {
    if (num <= 1) return false
    if (num <= 3) return true
    if (num % 2 === 0 || num % 3 === 0) return false
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false
    }
    return true
  }
  
  return numberList.filter(isPrime)
}

function MemoComponent() {
  const [count, setCount] = useState(0)
  const [numbers] = useState(Array.from({ length: 100 }, (_, i) => i + 1))

  // useMemo: calculation runs ONLY when 'numbers' changes
  const primeNumbers = useMemo(() => {
    return findPrimes(numbers)
  }, [numbers])

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">useMemo Demo</h2>
      
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <p className="text-sm">
          💡 <strong>Watch the console!</strong> The calculation only runs once, 
          not when you click the button below.
        </p>
      </div>

      <button 
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4"
      >
        Click Me: {count}
      </button>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-gray-100 rounded">
          <p><strong>Total Numbers:</strong> {numbers.length}</p>
          <p><strong>Prime Count:</strong> {primeNumbers.length}</p>
          <p><strong>Button Clicks:</strong> {count}</p>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <p className="font-semibold mb-2">First 10 Primes:</p>
          <p className="text-sm">{primeNumbers.slice(0, 10).join(', ')}</p>
        </div>
      </div>

      <div className="p-3 bg-yellow-50 rounded text-sm">
        <strong>How it works:</strong> <code className="bg-gray-200 px-1 rounded">useMemo</code> caches 
        the result. Even though you click the button and the component re-renders, 
        the expensive calculation doesn't run again!
      </div>
    </div>
  )
}

export default MemoComponent