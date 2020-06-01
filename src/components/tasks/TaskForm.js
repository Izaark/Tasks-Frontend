import React, { useContext, useState, useEffect } from "react";
import ContextProyect from "../../context/proyects/ContextProyect";
import ContextTask from "../../context/tasks/ContextTask";

const TaskForm = () => {
  const contextProyects = useContext(ContextProyect);
  const { proyect } = contextProyects;

  // get tasks proyects
  const contextTasks = useContext(ContextTask);
  const {
    taskSelected,
    taskError,
    addTask,
    validateTask,
    getTasks,
    updateTask,
    cleanTask,
  } = contextTasks;

  // effect that detect if is a task selected
  useEffect(() => {
    if (taskSelected !== null) {
      setTask(taskSelected);
    } else {
      setTask({
        name: "",
      });
    }
  }, [taskSelected]);
  // form state
  const [task, setTask] = useState({
    name: "",
  });
  // destructuting form state
  const { name } = task;

  // If not are selct proyect
  if (!proyect) return null;

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  // Array destructurin for ecxtrac actual proyect with position  0
  const [proyectNow] = proyect;
  const onSubmit = (e) => {
    e.preventDefault();

    // validate form
    if (name.trim() === "") {
      validateTask();
      return;
    }

    // if is edition or is new task
    if (taskSelected === null) {
      // add new task to task's state
      task.proyect = proyectNow._id;
      addTask(task);
    } else {
      // update task
      updateTask(task);
      // clean task
      cleanTask();
    }

    // get and filter actual proyect's tasks
    getTasks(proyectNow._id);

    // reset form
    setTask({
      name: "",
    });
  };
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de tarea..."
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={!taskSelected ? "Agregar Tarea" : "Editar la tarea"}
          />
        </div>
      </form>
      {taskError ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default TaskForm;
