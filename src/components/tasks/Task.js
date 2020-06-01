import React, { useContext } from "react";
import ContextTask from "../../context/tasks/ContextTask";
import ContextProyect from "../../context/proyects/ContextProyect";

const Task = ({ task }) => {
  // get proyects state initail
  const contextProyects = useContext(ContextProyect);
  const { proyect } = contextProyects;

  // get function context task function
  const contextTasks = useContext(ContextTask);
  const {
    deleteTask,
    getTasks,
    updateTask,
    saveActualTask,
  } = contextTasks;

  // Extract Proyect
  const [ActualProyect] = proyect;
  // function that execute when user push delete button
  const deleteTaskByID = (id) => {
    deleteTask(id, ActualProyect._id);
    getTasks(ActualProyect.id);
  };

  // function that change status tasks
  const changeStatus = (taks) => {
    if (taks.status) {
      task.status = false;
    } else {
      task.status = true;
    }
    updateTask(task);
  };

  // add acutaul task when user edit
  const taskSelect = (task) => {
    saveActualTask(task);
  };
  return (
    <li className="tarea sombra">
      <p>{task.name}</p>
      <div className="estado">
        {task.status ? (
          <button
            type="button"
            className="completo"
            onClick={() => changeStatus(task)}
          >
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => changeStatus(task)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => taskSelect(task)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => deleteTaskByID(task._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Task;
