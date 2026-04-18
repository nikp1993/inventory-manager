import type { UserData } from "../types/userData";

export class LoginPage {
    private emailTxt = "[data-testid='useremail']";
    private passwordTxt = "[data-testid='password']";
    private loginbtn = "[data-testid='login']";
    private registerLink = "[data-testid='registerHere']";

    enterLoginCredentials(testData: UserData) {
        cy.enterTextIn(this.emailTxt, testData.email);
        cy.enterTextIn(this.passwordTxt, testData.password);
    }

    clickLogin() {
        cy.intercept('POST', '/api/login').as('loginUser');
        cy.clickOn(this.loginbtn);
        cy.wait('@loginUser').its('response.statusCode').should('eq', 200);
    }

    login(testData: UserData) {
        this.enterLoginCredentials(testData);
        this.clickLogin();
    }

    navigateToRegisterUser() {
        cy.clickOn(this.registerLink);
    }
}

export default new LoginPage();