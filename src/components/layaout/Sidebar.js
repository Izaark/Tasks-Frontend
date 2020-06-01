import React from "react";
import NewProyect from "../proyects/NewProyect";
import ProyectList from "../proyects/ProyectsList";

const Sidebar = () => {
  return (
    <aside>
      <h1>
        MERN<span>Tasks</span>
      </h1>
      <NewProyect />
      <div className="proyectos">
        <h2>Tus Proyectos</h2>
        <ProyectList />
      </div>
    </aside>
  );
};

export default Sidebar;
