import React, { useContext, useEffect } from "react";
import Proyect from "./Proyect";
import ContextProyect from "../../context/proyects/ContextProyect";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContextAlert from "../../context/alerts/ContextAlert";

const ProyectList = () => {
  // extract state initial's proyects
  const contextProyects = useContext(ContextProyect);
  const { message, proyects, getProyects } = contextProyects;

  // set alert context
  const alertContext = useContext(ContextAlert);
  const { alert, showAlert } = alertContext;

  //   when component load set useeffect
  useEffect(() => {
    getProyects();
    if (message) {
      showAlert(message.msg, message.category);
    }
    // eslint-disable-next-line
  }, [message]);

  //   check if proyects is 0
  if (proyects.length === 0) return <p>No hay proyectos</p>;
  return (
    <ul className="listado-proyectos">
{alert ? <div className={`alert ${alert.category}`}>{alert.msg}</div>  : null}
      <TransitionGroup>
        {proyects.map((proyect) => (
          <CSSTransition key={proyect._id} timeout={200} classNames="proyecto">
            <Proyect proyect={proyect} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ProyectList;
