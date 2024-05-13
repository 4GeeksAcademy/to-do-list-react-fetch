import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import "./App.css"

function TodoItem({ label, delete_todo }) {
    return (
        <div className="todo-item">
            <span className='todo-text'>{label}</span>
            <div className='deletetrash' onClick={delete_todo}>
                <FaRegTrashAlt />
            </div>
        </div>
    );
}

const App = () => {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState("");

    useEffect(() => {
        obtenerTareas();
    }, []);

    const createUser = async () => {
        try {
            const raw = JSON.stringify([]);
            const url = `https://playground.4geeks.com/todo/users/Carlosguzman`;
            const options = {
                method: 'POST',
                body: raw,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(url, options);
            const data = await response.json();
            if (data.msg) {
                obtenerTareas();
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const borrarTodo = (index) => {
        const newTarea = [...todos.slice(0, index), ...todos.slice(index + 1)];
        setTodos(newTarea);
        actualizarTarea(newTarea);
    };

    const borrarTareas = () => {
        borrarTarea();
    };

    const obtenerTareas = () => {
        const url = "https://playground.4geeks.com/todo/users/Carlosguzman";
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.msg) {
                    createUser();
                } else {
                    setTodos(data);
                }
            });
    };

    const actualizarTarea = async (todos) => {
        try {
            const raw = JSON.stringify(todos);
            const url = `https://playground.4geeks.com/apis/fake/todos/user/Carlosguzman`;
            const options = {
                method: 'PUT',
                body: raw,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error.msg);
        }
    };

    const borrarTarea = async () => {
        try {
            const url = `https://playground.4geeks.com/apis/fake/todos/user/Carlosguzman`;
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch(url, options);
            const data = await response.json();
            if (data.msg) {
                createUser();
            }
        } catch (error) {
            console.log(error.msg);
        }
    };

    return (
        <div className='container-fluid'>
            <form
                onSubmit={(ev) => {
                    ev.preventDefault();

                    if (todoInput.length > 0) {
                        const todosActual = [
                            ...todos,
                            {
                                label: todoInput,
                                done: false
                            }
                        ];
                        setTodos(todosActual);
                        actualizarTarea(todosActual);
                        setTodoInput("");
                    }
                }}
                className='container flex column align-items-center justify-content-start'
            >
                <h1>To Do List</h1>
                <input
                    className='form-control form-control-lg'
                    type="text"
                    placeholder='Que necesitas hacer?'
                    aria-label="todo list input field"
                    value={todoInput}
                    onChange={(ev) => setTodoInput(ev.target.value)}
                />
                {todos.map((item, index) => (
                    <TodoItem key={index} label={item.label} delete_todo={() => borrarTodo(index)} />
                ))}
                <small>{todos.length} Deberes restantes</small>
                <small>{todos.length === 0 ? ", agregue una tarea" : ""}</small>
                <div className="row justify-content-end">
                    <button type="button" className="boton col-2" onClick={() => borrarTareas()}>
                        Borrar todas las tareas
                    </button>
                </div>
            </form>
        </div>
    );
};

export default App;
