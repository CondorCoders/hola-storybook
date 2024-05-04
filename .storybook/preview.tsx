import type { Preview } from "@storybook/react";
import "../src/index.css";
import React from "react";
import { initialize, mswLoader } from "msw-storybook-addon";

// Initialize MSW
initialize();

const preview: Preview = {
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
  globalTypes: {
    theme: {
      description: "Dark or Light mode",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark", "both"],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;

      if (theme === "light") {
        return <Story />;
      }

      if (theme === "dark") {
        return (
          <div className={"dark-theme"}>
            <Story />
          </div>
        );
      }

      return (
        <div>
          <Story />
          <div className={"dark-theme"}>
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;
