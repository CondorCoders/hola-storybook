import React, { useEffect, useState } from "react";
import { ToDo, ToDoProps } from "../ToDo/ToDo";

export const ToDoList = () => {
  const [todos, setTodos] = useState<ToDoProps[] | undefined>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setTodos(json);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <div>
      <h1>ToDo List</h1>
      {error && <p>Error loading todos</p>}
      {!error && todos?.map((todo) => <ToDo {...todo} />)}
    </div>
  );
};
