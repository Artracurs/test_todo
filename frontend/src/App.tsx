import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './UI/TodoList'
import TodoItem from './UI/TodoItem'
import List from './Todo/List'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <TodoList /> */}
      <List />
      {/* <TodoItem /> */}
    </>
  )
}

export default App
