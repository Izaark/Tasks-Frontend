import React, { useReducer } from "react";
import ContextAlert from "./ContextAlert";
import ReduceAlert from "./ReduceAlert";
import { SHOW_ALERT, HIDE_ALERT } from "../../types";

const StateAlert = (props) => {
  const initalState = {
    alert: null,
  };
  const [state, dispatch] = useReducer(ReduceAlert, initalState);

  const showAlert = (msg, category) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        msg,
        category,
      },
    });

    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
      });
    }, 3000);
  };
  return (
    <ContextAlert.Provider
      value={{
        alert: state.alert,
        showAlert,
      }}
    >
      {props.children}
    </ContextAlert.Provider>
  );
};

export default StateAlert;