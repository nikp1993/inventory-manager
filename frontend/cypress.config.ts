import { defineConfig } from "cypress";

export default defineConfig({
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
        supportFile: "cypress/component/support/component.ts",
        specPattern: "src/components/**/*.spec.cy.{ts,tsx}",
        indexHtmlFile: "cypress/component/support/component-index.html",
    },
    e2e: {
        specPattern: "cypress/e2e/tests/*.spec.cy.ts",
        supportFile: "cypress/e2e/support/e2e.ts",
        baseUrl: "http://localhost",
    },
});