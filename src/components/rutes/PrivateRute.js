import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import ContextAuth from "../../context/auth/ContextAuth";

// function that inheritance a component and protect rutes
const PrivateRute = ({ component: Component, ...props }) => {
  const authContext = useContext(ContextAuth);
  const { load, authenticated, userAuthenticated } = authContext;
  useEffect(() => {
    userAuthenticated();

    // eslint-disable-next-line
  }, []);
  return (
    <Route
      {...props}
      render={(props) =>
        !authenticated && !load ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
export default PrivateRute;
