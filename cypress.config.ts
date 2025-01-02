import { defineConfig } from "cypress";

export default defineConfig({
  video: true,
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
