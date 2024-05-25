import React from "react";
import { createTodo, getUserAndTask, deleteTodo } from "../functions";
import { MdOutlineDone } from "react-icons/md";


/* ESTE COMPONENTE AGREAGA TAREAS Y ELIMINA UNA SOLA TAREA */
const AddTodo = ({ inputTodo, setInputTodo, todos, setTodos, lessTodo, setLessTodo }) => {

    const handleKeyEnter = async (e) => {
        if (e.keyCode === 13 && inputTodo !== '') {
            const tareApi = { /* objeto que le paso a la función createTodo() */
                label: inputTodo,
                is_done: false
            }

            await createTodo(tareApi)
            const dataApi = await getUserAndTask()
            setTodos(dataApi)
            setInputTodo('')
        }
    }

    return (
        <>
            <div className='container d-flex justify-content-start col-3 bg-danger'>
                <input type='texto' placeholder='Que quieres hacer??' onChange={(e) => { setInputTodo(e.target.value) }} value={inputTodo} onKeyDown={handleKeyEnter}></input>
            </div>

            <div className="container d-flex justify-content-start col-3 bg-danger">
                <ul>
                    {
                        todos && Array.isArray(todos) && todos.length > 0 &&
                        /* EJECUTO UN MAP PARA RENDERIZAR DESPUÉS DE QUE LOS DATOS SE GUARDAN EN LA API */
                        todos.map(({ id, label }) => {
                            return <li key={id} onMouseOver={() => setLessTodo(true)} onMouseOut={() => setLessTodo(false)}>
                                {label} {lessTodo && (<button onClick={async () => {/* ELIMINA UNA SOLA TAREA */
                                    await deleteTodo(id)
                                    const dataApi = await getUserAndTask()
                                    setTodos(dataApi)
                                }}><MdOutlineDone /></button>)}
                            </li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default AddTodo