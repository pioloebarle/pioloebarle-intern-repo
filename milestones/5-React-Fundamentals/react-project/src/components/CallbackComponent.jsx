import { useState, useCallback, memo } from 'react'


const Button = memo(({ onClick, label }) => {
  console.log(`🔄 ${label} button rendered`)
  
  return (
    <button 
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    >
      {label}
    </button>
  )
})

Button.displayName = 'Button'

function CallbackComponent() {
  const [count, setCount] = useState(0)
  const [otherCount, setOtherCount] = useState(0)

  console.log('🎨 Parent component rendered')

  // WITHOUT useCallback - function is recreated on every render
  // This would cause the child to re-render even if we use React.memo
  const incrementWithoutCallback = () => {
    setCount(count + 1)
  }

  // WITH useCallback - function is memoized, only recreates when dependencies change
  // Child component won't re-render unnecessarily
  const incrementWithCallback = useCallback(() => {
    setOtherCount(prev => prev + 1)
  }, []) // Empty array means function never changes

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">useCallback Demo</h2>
      
      <div className="mb-4 p-3 bg-blue-50 rounded"> 
        <p className="text-sm">
          💡 <strong>Open the console!</strong> Watch which buttons re-render when you click.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="p-4 bg-red-50 rounded">
          <h3 className="font-semibold mb-2">❌ Without useCallback</h3>
          <p className="text-sm mb-3">Count: {count}</p>
          <Button 
            onClick={incrementWithoutCallback} 
            label="Increment (No Callback)"
          />
          <p className="text-xs text-gray-600 mt-2">
            This button re-renders every time parent renders
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded">
          <h3 className="font-semibold mb-2">✅ With useCallback</h3>
          <p className="text-sm mb-3">Count: {otherCount}</p>
          <Button 
            onClick={incrementWithCallback} 
            label="Increment (With Callback)"
          />
          <p className="text-xs text-gray-600 mt-2">
            This button only re-renders when its function changes
          </p>
        </div>
      </div>

      {/* <div className="p-4 bg-yellow-50 rounded text-sm">
        <p className="mb-2">
          <strong>🔍 How to test:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Open browser console</li>
          <li>Click "Increment (No Callback)" - Both buttons re-render!</li>
          <li>Click "Increment (With Callback)" - Only this button re-renders!</li>
        </ol>
      </div> */}
    </div>
  )
}

export default CallbackComponent