import React from "react";
import { getUserAndTask, deleteAllTodos } from "../functions";

/* ESTE COMPONENTE ELIMINA EL USUARIO DE LA API PORQUE EL USUARIO ES UN OBJETO CON CON LA 
   PROPIEDAD TODOS */
const ButtonDeleteTodos = ({ setTodos }) => {
    return (
        <>
            <div className='container d-flex justify-content-center col-3 bg-danger'>
                <button onClick={async () => {
                    await deleteAllTodos()
                    const dataApi = await getUserAndTask()
                    setTodos(dataApi)
                }}>Borrar Tareas</button>
            </div>

        </>
    )
}

export default ButtonDeleteTodos