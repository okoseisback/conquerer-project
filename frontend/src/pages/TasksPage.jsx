import React from "react";
import { useParams } from "react-router-dom";

import TaskForm from "../components/task/TaskForm";
import Tasks from "../components/task/Tasks";

const TasksPage = ({ todos, fetchTodosData }) => {
  const { todoId } = useParams();
  const todo = todos.find((todo) => {
    return todo._id === todoId;
  });
  // console.log(todos);
  // console.log(todos, "Prakash");

  const capitalize = (text) => {
    const newText = text.charAt(0).toUpperCase() + text.slice(1);
    return newText;
  };
  return (
    <div className="min-w-[60%] md:min-w-[75%] bg-gray-200 p-4 h-screen overflow-y-auto no-scrollbar">
ff
    </div>
  );
};

export default TasksPage;
