// .storybook/main.js
module.exports = {
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-links"
  ],
  docs: {
    autodocs: true
  }
};
