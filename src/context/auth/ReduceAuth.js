import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLOSE_SESSION,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        authenticated: true,
        message: null,
        load: false,
      };
    case GET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        load: false,
      };
    case CLOSE_SESSION:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        authenticated: null,
        message: action.payload,
        load: false,
      };
    default:
      return state;
  }
};
