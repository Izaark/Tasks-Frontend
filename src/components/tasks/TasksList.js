import React, { Fragment, useContext } from "react";
import Task from "./Task";
import ContextProyect from "../../context/proyects/ContextProyect";
import ContextTask from "../../context/tasks/ContextTask";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TaskList = () => {
  // get proyects state initail
  const contextProyects = useContext(ContextProyect);
  const { proyect, deleteProyect } = contextProyects;

  // get tasks proyects
  const contextTasks = useContext(ContextTask);
  const { proyectTasks } = contextTasks;

  // If not are selct proyect
  if (!proyect) return <h2>Selecciona un Proyecto</h2>;

  // Array destructurin for ecxtrac actual proyect with position  0
  const [proyectNow] = proyect;

  // delete proyect
  const onCLickDelete = () => {
    deleteProyect(proyectNow._id);
  };

  return (
    <Fragment>
      <h2>Proyecto: {proyectNow.name}</h2>
      <ul className="listado-tareas">
        {proyectTasks.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {proyectTasks.map((task) => (
              <CSSTransition key={task._id} timeout={200} classNames="tarea">
                <Task task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onCLickDelete}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default TaskList;
