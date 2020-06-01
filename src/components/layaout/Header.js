import React from "react";

const Header = ({ user, closeSession }) => {
  let userData = <span></span>;
  if (user) {
    userData = <span>{user.name}</span>;
  }

  return (
    <header className="app-header">
      <p className="nombre-usuario">Hola {userData}</p>
      <nav className="nav-principal">
        <button
          className="btn btn-blank nombre-usuario"
          onClick={() => closeSession()}
        >
          Cerrar Sesión{" "}
        </button>
      </nav>
    </header>
  );
};

export default Header;
