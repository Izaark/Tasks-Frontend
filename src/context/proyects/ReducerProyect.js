import {
  PROYECT_FORM,
  GET_PROYECTS,
  ADD_PROYECTS,
  VALIDATE_FORM,
  ACTUAL_PROYECT,
  DELETE_PROYECT,
  PROYECT_ERROR,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case PROYECT_FORM:
      return {
        ...state,
        form: true,
      };
    case GET_PROYECTS:
      return {
        ...state,
        proyects: action.payload,
      };
    case ADD_PROYECTS:
      return {
        ...state,
        proyects: [...state.proyects, action.payload],
        form: false,
        errorform: false,
      };
    case VALIDATE_FORM:
      return {
        ...state,
        errorform: true,
      };
    case ACTUAL_PROYECT:
      return {
        ...state,
        proyect: state.proyects.filter(
          (proyect) => proyect._id === action.payload
        ),
      };
    case DELETE_PROYECT:
      return {
        ...state,
        // return a proyect list, minus selected one
        proyects: state.proyects.filter(
          (proyect) => proyect._id !== action.payload
        ),
        proyect: null,
      };
    case PROYECT_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
