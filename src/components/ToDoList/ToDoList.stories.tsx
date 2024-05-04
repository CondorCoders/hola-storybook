import { Meta } from "@storybook/react";
import { ToDoList } from "./ToDoList";
import { http, HttpResponse } from "msw";
import { todos } from "./__fixtures__/todos";

const meta = {
  title: "Components/ToDoList",
  component: ToDoList,
} satisfies Meta<typeof ToDoList>;

export default meta;

export const Default = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos", () => {
          return HttpResponse.json(todos);
        }),
      ],
    },
  },
};

export const Error = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos", () => {
          return HttpResponse.error();
        }),
      ],
    },
  },
};
