import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from '../redux/slices/CounterSlice'

function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="text-2xl font-bold">Count: {count}</div>
      <div className="flex gap-2">
        <button 
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Increment
        </button>
        <button 
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Decrement
        </button>
        <button 
          onClick={() => dispatch(reset())}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
          Reset
        </button>
      </div>
    </div>
  )
}

export default Counter