import React from 'react'
import { useTodos } from '../context/TodoContext'
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

const HomePage = () => {
    const { todos } = useTodos();


  return (
    <>
        <h3 className='text-3xl font-bold text-center text-gray-800 p-2'>Todo App</h3>
        <TodoForm />

        <ul>
            {todos.map((todo) => (
               <TodoItem key={todo.id} todo={todo} /> 
            ))}
        </ul>

        {todos.length > 0 && (
            <p className='text-center p-2'>{`You have ${todos.length} todos.`}</p>
        )}
    </>
  )
}

export default HomePage