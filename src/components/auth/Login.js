import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ContextAlert from "../../context/alerts/ContextAlert";
import ContextAuth from "../../context/auth/ContextAuth";

const Login = (props) => {
  // extract context values
  const alertContext = useContext(ContextAlert);
  const { alert, showAlert } = alertContext;

  // extract auth context
  const authContext = useContext(ContextAuth);
  const { message, authenticated, userLogin } = authContext;

  // 
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
    email: "",
    password: "",
  });

  //   destrocturing
  const { email, password } = user;

  //   when user write data form
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //   when user want login
  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      showAlert("Todos los campos son obligatorios", "alert-error");
    }
    // pass data form to userLogin in context
    userLogin({email, password})
  };
  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
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
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link to={"/new-account"} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
