class usersPageItems{
    
    // Users page
    addNewUserButtonID = '#btn-add-new-user'
    
    // Create new user page
    userFirstNameID = "#UserFirstName";
    userLastNameID = "#UserLastName";
    contactEmailID = "#ContactEmail";
    userTypeID = "#UserType";
    customerNameDropDownID = "tbody > tr > td > select"
    userRoleID = "tbody > tr > td > select"
    doneButtonID = "[type=submit]"
    successMessageClass = ".toast-message"

    constructor() {
    }

    addNewUserButton() {
        return cy.get(this.addNewUserButtonID);
    }
    userFirstName() {
        return cy.get(this.userFirstNameID);
    }
    userLastName() {
        return cy.get(this.userLastNameID);
    }
    contactEmail() {
        return cy.get(this.contactEmailID);
    }
    userType() {
        return cy.get(this.userTypeID);
    }
    doneButton() {
        return cy.get(this.doneButtonID).contains('Done');
    }
    customerNameDropDown() {
        return cy.get(this.customerNameDropDownID).eq(0);
    }
    userRole() {
        return cy.get(this.userRoleID).eq(1);
    }
    successMessage() {
        return cy.get(this.successMessageClass);
    }
}

export default usersPageItems;