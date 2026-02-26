import { useState } from "react"
function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
        <button onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-yellow-200 text-black rounded-lg hover:bg-yellow-300">
            Count: {count}
        </button>
    </div>
  )
}

export default Counter