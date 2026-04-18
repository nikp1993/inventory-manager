declare global {
  namespace Cypress {
    interface Chainable {
      mount: (...args: any[]) => Chainable;
    }
  }
}

export {};