import React, { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import CounterTodo from "./CounterTodo"
import ButtonDeleteTodos from "./ButtonDeleteTodos";
import { createUser } from "../functions";



const TodoList = () => {
    const [inputTodo, setInputTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [lessTodo, setLessTodo] = useState(false)/* ALMACENA LOS CAMBIOS EN EL RENDERIZADO DEL EVENTO MOUESEOVER Y MOUSEOUT */  

    useEffect(()=>{
        createUser()
        .then(response=> setTodos(response))
    },[])

return (
    <>
        <div className='container d-flex justify-content-center col-3 mt-5 bg-danger'>
            <h1>Todo List</h1>
        </div>
        <AddTodo setInputTodo={setInputTodo} inputTodo={inputTodo} todos={todos} setTodos={setTodos} lessTodo={lessTodo} setLessTodo={setLessTodo} />
        <CounterTodo todos={todos} />
        <ButtonDeleteTodos setTodos={setTodos}/>
    </>
)
}

export default TodoList