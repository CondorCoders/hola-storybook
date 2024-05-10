import React, { useEffect, useState } from "react";
import { ToDo, ToDoProps } from "../ToDo/ToDo";
import { Button } from "../../stories/Button";

export const ToDoList = () => {
  const [todos, setTodos] = useState<ToDoProps[] | undefined>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => response.json())
      .then((json) => {
        setTodos(json);
      })
      .catch(() => setError(true));
  }, []);

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("todo") as string;

    if (!title) return;

    const newToDo: ToDoProps = {
      id: (todos?.length || 0) + 1,
      title,
      completed: false,
    };

    setTodos((prev) => prev && [newToDo, ...prev]);
    e.currentTarget.reset();
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <form onSubmit={onSave}>
        <input type="text" name="todo" id="todo" aria-label="todo" />
        <Button label="Guardar" primary type="submit" />
      </form>
      {error && <p>Error loading todos</p>}
      {!error && todos?.map((todo) => <ToDo {...todo} />)}
    </div>
  );
};
