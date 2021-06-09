// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... }


Cypress.Commands.add('RemoveCriteriaIfExists',(id,removeId) => {
    cy.get("body").then($body => {
        if ($body.find(id).length > 0) {   
           cy.get(removeId).click(); 
        }
    });
})

Cypress.Commands.add('randomString', (length) => { 
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return cy.wrap(result); 
});

Cypress.Commands.add('handleErrorModal',() => {
    cy.get('.app-wrapper').then(() => {
    cy.get('#vote-warnings-and-errors-modal',{timeout: 3000}).then($header => {
        if($header.is(':visible'))
        {
          
          cy.get('div.row.clearfix.floatright > button.btn.primary.gray').click({force: true},{timeout: 3000})
        cy.get('#btn-take-no-action').click({force: true})
        }
        
    })
})

})

Cypress.Commands.add('selectValueFromCriteriaOption',(id,inputVal,object,updatebtn) => {
    cy.get(`${id}`).click()
    cy.get(`input[${inputVal}='${object}']`).check({force:true});
    cy.get(`${updatebtn}`).click({force:true});
})
Cypress.Commands.add('AddCriteriaOption',(searchText,inputValue) => {
    cy.get('#btn-add-criteria').click({force:true});
    cy.get('#txt-filter-criteria').type(searchText,{force:true});
    cy.get(`input[value='${inputValue}']`).check({ force: true });
    cy.get('#btn-apply-criteria').click();
})

Cypress.Commands.add('verifyMeetingOptionButtons',() => {
    cy.get('#btn-vote-now').should('be.visible');
    cy.get('#btn-take-no-action').should('be.visible');
    cy.get('#btn-instruct').should('be.visible');	
})


Cypress.Commands.add("login", (username = Cypress.env('Internal_Admin_Username'), password = Cypress.env('Internal_Admin_Password')) => {
    cy.request('/')
        .its('body')
        .then((body) => {
            // we can use Cypress.$ to parse the string body
            // thus enabling us to query into it easily
            const $html = Cypress.$(body);
            const csrf = $html.find("input[name=csrf-token]").val();

            cy.request({
                method: 'POST',
                url: '/Home/Authenticate/',
                headers: {
                    'CSRFToken': csrf
                },
                body: {
                    Username: username,
                    Password: password,
                }

            }).then((resp) => {
                expect(resp.status).to.eq(200);
                expect(resp.body.Succeded).to.be.true;
            });
        });
});

Cypress.Commands.add("loginExternal", (username = Cypress.env('External_Username'), password = Cypress.env('Internal_Admin_Password')) => {
    cy.request('/')
        .its('body')
        .then((body) => {
            // we can use Cypress.$ to parse the string body
            // thus enabling us to query into it easily
            const $html = Cypress.$(body);
            const csrf = $html.find("input[name=csrf-token]").val();

            cy.request({
                method: 'POST',
                url: '/Home/Authenticate/',
                headers: {
                    'CSRFToken': csrf
                },
                body: {
                    Username: username,
                    Password: password,
                }

            }).then((resp) => {
                expect(resp.status).to.eq(200);
                expect(resp.body.Succeded).to.be.true;
            });
        });
});

Cypress.Commands.add("checkIfExists", (ele) => {
    return new Promise((resolve,reject)=>{
        /// here if  ele exists or not
        cy.get('body').find( ele ).its('length').then(res=>{
            if(res > 0){
                //// do task that you want to perform
                cy.get(ele).check();
                resolve();
            }else{
                reject();
            }
        });
    })
})

