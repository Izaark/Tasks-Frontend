import React, { useContext, useEffect } from "react";
import Sidebar from "../layaout/Sidebar";
import Header from "../layaout/Header";
import TaskForm from "../tasks/TaskForm";
import TaskList from "../tasks/TasksList";
import ContextAuth from "../../context/auth/ContextAuth";

const Proyects = () => {
  // extract data authentication
  const authContext = useContext(ContextAuth);
  const { userAuthenticated, user, closeSession } = authContext;

  useEffect(() => {
    userAuthenticated();
     // eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      <Sidebar  />
      <div className="seccion-principal">
        <Header user={user} closeSession={closeSession}/>
        <main>
          <TaskForm />
          <div className="contenedor-tareas">
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyects;
