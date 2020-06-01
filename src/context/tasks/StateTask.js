import React, { useReducer } from "react";
import ContextTask from "./ContextTask";
import ReducerTask from "./ReducerTask";
import axiosClient from "../../config/axios";
import {
  PROYECT_TASKS,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK,
  CLEAN_TASK,
} from "../../types";
const StateTask = (props) => {
  const initalState = {
    proyectTasks: [],
    taskError: false,
    taskSelected: null,
  };

  // create state && dispatch
  const [state, dispatch] = useReducer(ReducerTask, initalState);

  //create functions

  // get proyects's tasks
  const getTasks = async (proyect) => {
    
    try {
      const result = await axiosClient.get("/tasks", { params: { proyect } });

      dispatch({
        type: PROYECT_TASKS,
        payload: result.data.tasks,
      });
    } catch (error) {
      
    }
  };

  //   add new task to selected proyect
  const addTask = async (task) => {
    try {
      const result = await axiosClient.post("/tasks", task);
      dispatch({
        type: ADD_TASK,
        payload: result.data.task,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // validate and show an error form task
  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  };

  //   delete tasj by id
  const deleteTask = async (id, proyect) => {
    try {
      await axiosClient.delete(`/tasks/${id}`, {
        params: { proyect },
      });

      dispatch({
        type: DELETE_TASK,
        payload: id,
      });
    } catch (error) {
      console.error("error: ", error);
    }
  };

  //  update task
  const updateTask = async (task) => {
    try {
      const result = await axiosClient.put(`/tasks/${task._id}`, task);
    
      dispatch({
        type: UPDATE_TASK,
        payload: result.data.task,
      });
    } catch (error) {}
  };

  //   save actual task
  const saveActualTask = (task) => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task,
    });
  };

  //clean task
  const cleanTask = () => {
    dispatch({
      type: CLEAN_TASK,
    });
  };
  return (
    <ContextTask.Provider
      value={{
        proyectTasks: state.proyectTasks,
        taskError: state.taskError,
        taskSelected: state.taskSelected,
        getTasks,
        addTask,
        validateTask,
        deleteTask,
        saveActualTask,
        updateTask,
        cleanTask,
      }}
    >
      {props.children}
    </ContextTask.Provider>
  );
};

export default StateTask;
