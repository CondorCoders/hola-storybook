import React, { useState } from "react";
import styles from "./ToDo.module.css";

export interface ToDoProps {
  id: string;
  todo: string;
  isCompleted?: boolean;
}

export const ToDo = ({ id, todo, isCompleted = false }: ToDoProps) => {
  const [completed, setCompleted] = useState<boolean>(isCompleted);
  return (
    <div className={styles.toDo}>
      <input
        type="checkbox"
        checked={completed}
        id={id}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <span className={completed ? styles.completed : ""}>{todo}</span>
    </div>
  );
};
