import LoginPage from "../pages/Login.page";
import ItemsPage from "../pages/Items.page";
import type { ItemsData } from "../types/itemsData";
import type { UserData } from "../types/userData";

let userData: UserData
let itemData: ItemsData;

describe('As a logged in user I can add, update and delete an item', () => {

  beforeEach(() => {
    cy.navigateToApp();
    cy.fixture('UserData.json').then((data) => {
      userData = data;
    });
    cy.fixture('ItemsData.json').then((data) => {
      itemData = data;
    });
  });

  it('E2EFlow2_Verify user is able to add, update and delete an item in catalog', () => {
    LoginPage.login(userData);
    ItemsPage.addNewItem(itemData);
    ItemsPage.validateItemAddedSuccessfully(itemData);
    ItemsPage.updateItem(itemData);
    ItemsPage.validateItemUpdatedSuccessfully(itemData);
    ItemsPage.deleteItem();
  });

  afterEach(() => {
    ItemsPage.logout();
  });
});