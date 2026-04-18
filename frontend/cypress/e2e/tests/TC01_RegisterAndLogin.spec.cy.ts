import RegisterUserPage from '../pages/RegisterUser.page';
import LoginPage from '../pages/Login.page';
import ItemsPage from '../pages/Items.page';
import type { UserData } from '../types/userData';

let testData: UserData;

describe('As a new user I can register and login', () => {

  beforeEach(() => {
    cy.navigateToApp();
    cy.fixture('UserData.json').then((userData) => {
      testData = userData;
    });
  });

  it('E2EFlow1_Verify user is able to register and login', () => {
    LoginPage.navigateToRegisterUser();
    RegisterUserPage.registerUser(testData);
    RegisterUserPage.verifyRegistrationSuccess();
    LoginPage.login(testData);
    ItemsPage.validateNoItemsForNewUser();
    ItemsPage.logout();
  });
});