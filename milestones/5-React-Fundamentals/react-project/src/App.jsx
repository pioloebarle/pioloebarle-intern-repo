import './App.css'
import Counter from './Counter'
import HelloWorld from './HelloWorld'
import { useState } from 'react'
function App() {
  const [inputValue, setInputValue] = useState("")
  const [items, setItems] = useState([])
  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue])
      setInputValue("")
    }
  }
  return (
    <>
      <HelloWorld name = "Piolo Pascual E. Besinga" ></HelloWorld>
      <Counter></Counter>
      <div className='px-5 py-5 flex flex-col gap-4 items-center'>
        <h1 className='text-2xl font-bold'>My list</h1>
        <input type="text" className='w-1/2 border-2 px-1 py-1 rounded-lg' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
      
        <button className='border-2 px-2 py-0.5 rounded-lg' onClick={handleAddItem}>Add Item</button>
      </div>

      {items.length > 0 && (
        <div className='mt-4'>
          <h2 className='text-xl font-bold'>Items:</h2>
          <ul className='list-disc pl-5'>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

    </>
  )
}

export default App
