import React, { useState } from 'react'
import { useTodo } from '../context/index';

function TodoForm() {
    const [todoText, setTodoText] = useState('') // Initialize with an empty string
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()

        // Trim whitespace from input
        const trimmedText = todoText.trim()

        // Check if input is not empty
        if (!trimmedText) return

        // Add todo
        addTodo({ todo: trimmedText, completed: false })

        // Clear input field after adding todo
        setTodoText('')
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 py-1.5"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;
