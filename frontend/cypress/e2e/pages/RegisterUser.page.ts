import type { UserData } from "../types/userData";

export class RegisterUserPage {
    private firstNameField = "[data-testid='firstName']";
    private lastNameField = "[data-testid='lastName']";
    private emailField = "[data-testid='email']";
    private passwordField = "[data-testid='password']";
    private registerBtn = "[data-testid='register']";

    fillRegistrationForm(testData: UserData) {
        cy.enterTextIn(this.firstNameField, testData.firstName);
        cy.enterTextIn(this.lastNameField, testData.lastName);
        cy.enterTextIn(this.emailField, testData.email);
        cy.enterTextIn(this.passwordField, testData.password);
        return this;
    }

    clickRegister() {
        cy.intercept('POST', '/api/register').as('registerUser');
        cy.clickOn(this.registerBtn);
        cy.wait('@registerUser').its('response.statusCode').should('eq', 201);
        return this;
    }

    registerUser(testData: UserData) {
        this.fillRegistrationForm(testData);
        this.clickRegister();
    }

    verifyRegistrationSuccess() {
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.be.equal('Registration successful! Please login.');
        });
    }
}

export default new RegisterUserPage();