import React, { useState } from "react";
import styles from "./ToDo.module.css";

export interface ToDoProps {
  id: number;
  title: string;
  completed?: boolean;
}

export const ToDo = ({
  id,
  title,
  completed: isCompleted = false,
}: ToDoProps) => {
  const [completed, setCompleted] = useState<boolean>(isCompleted);
  return (
    <div className={styles.toDo}>
      <input
        type="checkbox"
        checked={completed}
        id={id.toString()}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <span className={completed ? styles.completed : ""}>{title}</span>
    </div>
  );
};
