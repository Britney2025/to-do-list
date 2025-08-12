import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import {
    query,
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore'

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [editingTodoId, setEditingTodoId] = useState(null)


    const addTodo = async (text) => {
        if (text.trim() === '') {
            alert("Please add a valid todo");
            return;
        }
        await addDoc(collection(db, 'todos'), {
            text: text,
            completed: false,
        });
    };

    useEffect(() => {
        const q = query(collection(db, 'todos'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todoArr = [];
            querySnapshot.forEach((doc) => {
                todoArr.push({ ...doc.data(), id: doc.id});
            });
            setTodos(todoArr);
        });
        return () => unsubscribe();
    }, []);


    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, 'todos', todo.id), {
            completed: !todo.completed
        });
    }

    const updateTodoText = async (id, newText) => {
        if (newText.trim() === '' ) {
            alert("Todo text cannot be empty");
            return;
        }

        const todoDocRef = doc(db, 'todos', id);
        await updateDoc(todoDocRef, {
            text: newText,
        });
        
    }

    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, 'todos', id));
    }

    return (
        <TodoContext.Provider value={{todos, addTodo, toggleComplete, updateTodoText, editingTodoId, setEditingTodoId, deleteTodo}}>
            { children }
        </TodoContext.Provider>
    )
}

export const useTodos = () => {
    return useContext(TodoContext)
}