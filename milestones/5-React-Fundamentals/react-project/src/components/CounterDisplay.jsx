import { useSelector } from 'react-redux'
import { selectCounterValue } from '../redux/slices/CounterSlice'

function CounterDisplay() {
    const count = useSelector(selectCounterValue)

    const getMessage = () => {
        if (count < 0) {
            return { text: "Negative numbers!", color: "text-red-600" }
        }
        else if (count === 0) {
            return { text: "Starting point", color: "text-gray-600" }
        }
        else if (count > 0 && count <= 10) {
            return { text: "Counting up!", color: "text-blue-600" }
        }
        else if (count > 10 && count <= 20) {
            return { text: "Making progress!", color: "text-green-600" }
        }
        else {
            return { text: "Excellent work!", color: "text-yellow-600" }
        }
    }

    const message = getMessage()

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Counter Status</h3>
            <p className={`text-lg font-bold ${message.color}`}>
                {message.text}
            </p>
            <p className="text-sm text-gray-500 mt-2">
                Current value: {count}
            </p>
        </div>
    )
}

export default CounterDisplay
