import { Meta, StoryObj } from "@storybook/react";
import { ToDoList } from "./ToDoList";
import { http, HttpResponse } from "msw";
import { todos } from "./__fixtures__/todos";
import { expect, userEvent, within } from "@storybook/test";

const meta = {
  title: "Components/ToDoList",
  component: ToDoList,
} satisfies Meta<typeof ToDoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const todoInput = canvas.getByLabelText("todo", { selector: "input" });

    await userEvent.type(todoInput, "Test 4");

    const saveButton = canvas.getByRole("button");
    await userEvent.click(saveButton);

    const newTodo = canvas.getByLabelText("Test 4", { selector: "input" });
    await expect(newTodo).toBeInTheDocument();
  },
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
