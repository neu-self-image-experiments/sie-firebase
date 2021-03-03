module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/stories/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/stories/layouts/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/stories/pages/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ]
}