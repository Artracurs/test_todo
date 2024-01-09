import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './UI/TodoList'
import TodoItem from './UI/TodoItem'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <TodoList /> */}
      <TodoItem />
    </>
  )
}

export default App
