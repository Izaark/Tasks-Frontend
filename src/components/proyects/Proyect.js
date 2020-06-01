import React, { useContext } from "react";
import ContextProyect from "../../context/proyects/ContextProyect";
import ContextTask from "../../context/tasks/ContextTask";

const Proyect = ({ proyect }) => {
  // get proyects state
  const contextProyects = useContext(ContextProyect);
  const { actualProyect } = contextProyects;

  // get function context task function
  const contextTasks = useContext(ContextTask);
  const { getTasks } = contextTasks;

  // function for add actual proyect
  const selectProyect = (id) => {
    actualProyect(id); // set actual proyect
    getTasks(id); // filter tasks when click
  };
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => selectProyect(proyect._id)}
      >
        {proyect.name}
      </button>
    </li>
  );
};

export default Proyect;
