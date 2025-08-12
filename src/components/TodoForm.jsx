import { useEffect, useState } from "react"
import { useTodos } from "../context/TodoContext";
import { AiOutlinePlus } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";

const TodoForm = ({ todoToEdit }) => {
    const [input, setInput] = useState('');
    const { addTodo, updateTodoText, setEditingTodoId  } = useTodos();

    const isEditMode = !!todoToEdit;

    useEffect(() => {
        if (isEditMode) {
            setInput(todoToEdit.text);
        }
    }, [isEditMode, todoToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            updateTodoText(todoToEdit.id, input);
            setEditingTodoId(null)
        } else {
            addTodo(input);
        }
        
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-between">
            <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border p-2 w-full text-xl"
                placeholder={isEditMode ? "Update Todo" : "Add Todo"}
            />

            <button type="submit"  className="border p-4 ml-2 bg-purple-500 text-slate-500">
                {isEditMode ? <GrPowerReset size={30} /> : <AiOutlinePlus size={30} />}
            </button>
        </form>
    )
}

export default TodoForm;