import React, { Fragment, useState, useContext } from "react";
import ContextProyect from "../../context/proyects/ContextProyect";

const NewProyect = () => {
  // get form state
  const contextProyects = useContext(ContextProyect);

  const { form, errorform, showForm, addProyect, showError } = contextProyects;
  //set state
  const [proyect, setProyect] = useState({
    name: "",
  });

  // extract name proyect
  const { name } = proyect;

  //when user write data form
  const onChangeProyect = (e) => {
    setProyect({
      ...proyect,
      [e.target.name]: e.target.value,
    });
  };
  //   when send name
  const onSubmitProyect = (e) => {
    e.preventDefault();

    // validate proyect
    if (name === '') {
      showError();
      return;
    }

    //get and set function from stateProyect
    addProyect(proyect);

    // restart form
    setProyect({
      name: "",
    });
  };
  const onClick = () => {
    showForm();
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClick}
      >
        Nuevo Proyecto
      </button>
      {form ? (
        <form onSubmit={onSubmitProyect} className="formulario-nuevo-proyecto">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre del Proyecto"
            name="name"
            value={name}
            onChange={onChangeProyect}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}
      {errorform ? (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      ) : null}
    </Fragment>
  );
};

export default NewProyect;
