import React from "react";
// import { addDecorator } from "@storybook/react";
import { ThemeProvider, theme, CSSReset, Box } from "@chakra-ui/react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};

// Global decorator
export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Box m={4}>
        <Story />
      </Box>
    </ThemeProvider>
  ),
];

// // Global decorator in an alternative way
// addDecorator((story) => (
//   <ThemeProvider theme={theme}>
//     <CSSReset />
//     <Box m={4}>{story()}</Box>
//   </ThemeProvider>
// ));
