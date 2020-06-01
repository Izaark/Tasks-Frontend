import {
  PROYECT_TASKS,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK,
  CLEAN_TASK,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case PROYECT_TASKS:
      return {
        ...state,
        proyectTasks: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        proyectTasks: [action.payload, ...state.proyectTasks],
        taskError: false,
      };
    case VALIDATE_TASK:
      return {
        ...state,
        taskError: true,
      };
    case DELETE_TASK:
      return {
        ...state,
        proyectTasks: state.proyectTasks.filter(
          (task) => task._id !== action.payload
        ),
      };
    case UPDATE_TASK:
      return {
        ...state,
        proyectTasks: state.proyectTasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case ACTUAL_TASK:
      return {
        ...state,
        taskSelected: action.payload,
      };
    case CLEAN_TASK:
      return {
        ...state,
        taskSelected: null,
      };
    default:
      return state;
  }
};
