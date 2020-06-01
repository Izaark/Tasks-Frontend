import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ContextAlert from "../../context/alerts/ContextAlert";
import ContextAuth from "../../context/auth/ContextAuth";

const NewAccount = (props) => {
  // extract context values
  const alertContext = useContext(ContextAlert);
  const { alert, showAlert } = alertContext;

  // extract auth context
  const authContext = useContext(ContextAuth);
  const { message, authenticated, userRegister } = authContext;

  // execute when user is authenticated sent to proyects or check errors
  useEffect(() => {
    
    if (authenticated) {
      props.history.push("/proyects");
    }
    if (message) {
      showAlert(message.msg, message.category);
    }
     // eslint-disable-next-line
  }, [message, authenticated, props.history]);
  // create user state
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  //   destrocturing
  const { name, email, password, confirm } = user;

  //   when user write data form
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //   when user want NewAccount
  const onSubmit = (e) => {
    e.preventDefault();
    // validate form data
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirm.trim() === ""
    ) {
      showAlert("Todos los campos son obligatorios", "alert-error");
      return;
    }
    // validate passwords

    if (password.length < 6) {
      showAlert("El password debe ser minimo de 6 caracteres", "alert-error");
      return;
    }
    if (password !== confirm) {
      showAlert("Los password no coinciden", "alert-error");
      return;
    }

    userRegister({
      name,
      email,
      password,
    });
  };
  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Tu Nombre"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Tu Email"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Tu Password"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirm">Confirmar Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              value={confirm}
              placeholder="Confirmar Password"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NewAccount;
