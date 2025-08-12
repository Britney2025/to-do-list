import React from 'react'
import { useTodos } from '../context/TodoContext'
import { FaPen, FaRegTrashAlt } from 'react-icons/fa';
import TodoForm from './TodoForm';

const style = {
    li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
    liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through`,
    button: `cursor-pointer flex items-center`
}

const TodoItem = ({ todo }) => {
    const { toggleComplete, deleteTodo, editingTodoId, setEditingTodoId } = useTodos();


    if (editingTodoId === todo.id) {
        return (
            <li className={style.li}>
                <TodoForm todoToEdit={todo} />
            </li>
        )
    }

    return (
            <li className={todo.completed ? style.liComplete : style.li}>
                <div className={style.row}>
                    <input
                        type="checkbox"
                        onChange={() => toggleComplete(todo)}
                        checked={todo.completed}
                    />
                    <p onClick={() => toggleComplete(todo)} className={todo.completed ? style.textComplete : style.text}>
                        {todo.text}
                    </p>
                </div>

                <div className="flex items-center">
                    <button onClick={() => setEditingTodoId(todo.id)} className='mr-3'>
                        <FaPen />
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>
                        <FaRegTrashAlt />
                    </button>
                </div>
            </li>
    )
}

export default TodoItem