import { defineConfig } from "cypress";

export default defineConfig({
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
        supportFile: "src/cypress/support/component.ts",
        specPattern: "src/components/**/*.spec.cy.{ts,tsx}",
        indexHtmlFile: "src/cypress/support/component-index.html",
    },
});