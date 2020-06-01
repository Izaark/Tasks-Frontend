import React, { useReducer } from "react";
import ContextAuth from "./ContextAuth";
import ReduceAuth from "./ReduceAuth";
import axiosClient from "../../config/axios";
import authToken from "../../config/authToken";
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLOSE_SESSION,
} from "../../types";

const StateAuth = (props) => {
  // set initial state from reduce
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: null,
    user: null,
    message: null,
    load: true,
  };

  //   extract reduce
  const [state, dispatch] = useReducer(ReduceAuth, initialState);

  const userRegister = async (data) => {
    try {
      const response = await axiosClient.post("/user", data);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.token,
      });
      //   get user data
      userAuthenticated();
    } catch (error) {
      const alert = {
        msg: error.response.data.msg,
        category: "alert-error",
      };
      dispatch({
        type: REGISTER_ERROR,
        payload: alert,
      });
    }
  };

  // set function for user authenticated
  const userAuthenticated = async () => {
    const token = localStorage.getItem("token");
    // get and set token in headers
    if (token) {
      authToken(token);
    }
    // request to auth with token in  headers
    try {
      const response = await axiosClient.get("/auth");
      dispatch({
        type: GET_USER,
        payload: response.data.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };
  //   when user init session
  const userLogin = async (data) => {
    try {
      const response = await axiosClient.post("/auth", data);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.token,
      });
      //   get user data
      userAuthenticated();
    } catch (error) {
      let responseMsg = null;
      if (error.response.data.errors) {
        responseMsg = error.response.data.errors[0].msg;
      } else {
        responseMsg = error.response.data.msg;
      }
      const alert = {
        msg: responseMsg,
        category: "alert-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      });
    }
  };

  const closeSession = async () => {
    dispatch({
      type: CLOSE_SESSION,
    });
  };
  return (
    <ContextAuth.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        load: state.load,
        userRegister,
        userLogin,
        userAuthenticated,
        closeSession,
      }}
    >
      {props.children}
    </ContextAuth.Provider>
  );
};

export default StateAuth;
