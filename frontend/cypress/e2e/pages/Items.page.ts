import type { ItemsData } from "../types/itemsData";

export class ItemsPage {
    private addNewItemBtn = "[data-testid='addNewItem']";
    private editItemBtn = "[data-testid='editItem']";
    private deleteItemBtn = "[data-testid='deleteItem']";
    private itemNameTxt = "[data-testid='Name']";
    private itemQuantityTxt = "[data-testid='quantity']";
    private addBtn = "[data-testid='add']";
    private editSaveBtn = "[data-testid='editSave']";
    private editNameTxt = "[data-testid='editName']";
    private editQuantityTxt = "[data-testid='editQuantity']";
    private itemList = "tbody tr";
    private logoutBtn = "[data-testid='logoutBtn']";
    private noItemsText = "[data-testid='noItemsText']";

    clickOnAddNewItem() {
        cy.clickOn(this.addNewItemBtn);
    }

    enterNameAndQuantity(testData: ItemsData) {
        console.log('Entering item details:', testData); // Debug log to verify data being entered
        cy.enterTextIn(this.itemNameTxt, testData.NameToBeAdded);
        cy.enterTextIn(this.itemQuantityTxt, testData.QuantityToBeAdded);
    }


    clickOnAdd() {
        cy.intercept('POST', '/api/items').as('addItem');
        cy.clickOn(this.addBtn);
        cy.wait('@addItem').its('response.statusCode').should('eq', 201);
    }

    addNewItem(testData: ItemsData) {
        this.clickOnAddNewItem();
        this.enterNameAndQuantity(testData);
        this.clickOnAdd();
    }

    validateItemAddedSuccessfully(testData: ItemsData) {
        cy.get(this.itemList).last().within(() => {
            cy.get('td').eq(0).should('have.text', testData.NameToBeAdded);
        });
    }

    clickOnEditItem() {
        cy.get(this.itemList).last()
            .find(this.editItemBtn)
            .click();
    }

    updateNameAndQuantity(testData: ItemsData) {
        cy.enterTextIn(this.editNameTxt, testData.NameToBeUpdated);
        cy.enterTextIn(this.editQuantityTxt, testData.QuantityToBeUpdated);
    }

    clickOnSaveEdit() {
        cy.intercept('PUT', '/api/items/*').as('updateItemRequest');
        cy.clickOn(this.editSaveBtn);
        cy.wait('@updateItemRequest').its('response.statusCode').should('eq', 200);
    }

    updateItem(testData: ItemsData) {
        this.clickOnEditItem();
        this.updateNameAndQuantity(testData);
        this.clickOnSaveEdit();
    }

    validateItemUpdatedSuccessfully(testData: ItemsData) {
        cy.get(this.itemList).last().within(() => {
            cy.get('td').eq(0).should('have.text', testData.NameToBeUpdated);
        });
    }

    public async clickOnDeleteItem() {
        cy.get(this.itemList).last()
            .find(this.deleteItemBtn)
            .click();
    }

    deleteItem() {
        cy.intercept('DELETE', '/api/items/*').as('deleteItemRequest');
        this.clickOnDeleteItem();
        cy.wait('@deleteItemRequest').its('response.statusCode').should('eq', 204);
    }

    validateItemDeletedSuccessfully() {
        this.validateNoItemsForNewUser();
    }

    logout() {
        cy.clickOn(this.logoutBtn);
    }

    validateNoItemsForNewUser() {
        cy.get(this.noItemsText).should('be.visible').and('have.text', 'No items found.');
    }
}

export default new ItemsPage();

