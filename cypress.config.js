const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    specPattern: "cypress/component/**/*.cy.jsx",

    supportFile: "cypress/support/component.js",

    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
  },
});
