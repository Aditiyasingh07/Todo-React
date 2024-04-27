import { TodoProvider } from './context/index'
import { useEffect, useState } from 'react'
import './App.css'
import { TodoForm, TodoItem } from './components/Index'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    )
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))

    if (todos && todos.length) {
      setTodos(todos)
    }
  }, [setTodos])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] w-1/2 m-auto p-5 my-5 rounded-3xl h-screen">
        <div className="w-full mx-auto shadow-md rounded-lg">
          <h1 className="text-2xl text-white font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-col gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="h-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
