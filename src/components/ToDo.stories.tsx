import { Meta } from "@storybook/react";
import { ToDo } from "./ToDo";

const meta = {
  title: "Components/ToDo",
  component: ToDo,
  args: {
    id: "1",
    todo: "Hola Mundo",
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className={"dark-theme"}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ToDo>;

export default meta;

export const Default = {};

export const Completed = {
  args: {
    isCompleted: true,
  },
};
