declare global {
  namespace Cypress {
    interface Chainable {
      navigateToApp: () => Chainable<void>;
      enterTextIn: (selector: string, text: string) => Chainable<void>;
      clickOn: (selector: string) => Chainable<void>;
    }
  }
}



Cypress.Commands.add('navigateToApp', () => {
  cy.visit('http://localhost');
});

Cypress.Commands.add('enterTextIn', (selector, text) => {
  cy.get(selector).should('be.visible').clear().type(text);
});

Cypress.Commands.add('clickOn', (selector) => {
  cy.get(selector).should('be.visible').click();
});