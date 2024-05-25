import React from "react";


const CounterTodo = ({todos}) => {
    return (
        <>
            <div className='container d-flex justify-content-start col-3 bg-danger'>
                <h5>
                    {todos && todos.length} tareas pendientes.
                </h5>
            </div>
        </>
    )
}

export default CounterTodo