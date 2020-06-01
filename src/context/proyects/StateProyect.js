import React, { useReducer } from "react";
import ContextProyect from "./ContextProyect";
import ReducerProyect from "./ReducerProyect";
import axiosClient from "../../config/axios";

import {
  PROYECT_FORM,
  GET_PROYECTS,
  ADD_PROYECTS,
  VALIDATE_FORM,
  ACTUAL_PROYECT,
  DELETE_PROYECT,
  PROYECT_ERROR,
} from "../../types";

const SateProyect = (props) => {

  const InitialState = {
    proyects: [],
    form: false,
    errorform: false,
    proyect: null,
    message: null,
  };

  //   Dispatch for exec the accions
  const [state, dispatch] = useReducer(ReducerProyect, InitialState);

  //   functions for CRUD
  const showForm = () => {
    dispatch({
      type: PROYECT_FORM,
    });
  };
  // get propyects
  const getProyects = async () => {
    try {
      const result = await axiosClient.get("/proyects");
      dispatch({
        type: GET_PROYECTS,
        payload: result.data.proyects,
      });
    } catch (error) {
      const alert = {
        msg: error.response.data.msg.message,
        category: "alert-error",
      };
      dispatch({
        type: PROYECT_ERROR,
        payload: alert,
      });
    }
  };

  // add proyects
  const addProyect = async (proyect) => {
    try {
      const result = await axiosClient.post("/proyects", proyect);
   
      dispatch({
        type: ADD_PROYECTS,
        payload: result.data.proyect,
      });
    } catch (error) {
      const alert = {
        msg: error.response.data.msg.message,
        category: "alert-error",
      };
      dispatch({
        type: PROYECT_ERROR,
        payload: alert,
      });
    }
  };

  //   validate form
  const showError = () => {
    dispatch({
      type: VALIDATE_FORM,
    });
  };
  //select proyect that user gave clic
  const actualProyect = (proyectId) => {
    dispatch({
      type: ACTUAL_PROYECT,
      payload: proyectId,
    });
  };
  // delete proyect
  const deleteProyect = async (proyectId) => {
    try {
      await axiosClient.delete(`/proyects/${proyectId}`);
      dispatch({
        type: DELETE_PROYECT,
        payload: proyectId,
      });
    } catch (error) {
      const alert = {
        msg: error.response.data.msg.message,
        category: "alert-error",
      };
      dispatch({
        type: PROYECT_ERROR,
        payload: alert,
      });
    }
  };
  return (
    <ContextProyect.Provider
      value={{
        form: state.form,
        proyects: state.proyects,
        errorform: state.errorform,
        proyect: state.proyect,
        message: state.message,
        showForm,
        getProyects,
        addProyect,
        showError,
        actualProyect,
        deleteProyect,
      }}
    >
      {props.children}
    </ContextProyect.Provider>
  );
};

export default SateProyect;
