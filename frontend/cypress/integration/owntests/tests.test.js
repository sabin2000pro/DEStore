/// <reference types = "cypress" />
// Cypress E2E Tests

describe('Testing Suite for DE-Store', () => {

    it('Homepage Tests', () => {
        cy.visit('http://localhost:3000/');
    });

    it('View Products page Tests', () => {
        cy.visit('http://localhost:3000/productslist');
        cy.contains('View Products').click();
        cy.get('.search__input').should('exist');
        cy.get('.search__input');
    })

    it('Register Page Tests Set I', () => { // Test that page has existing title
        cy.visit('http://localhost:3000/register');
        cy.contains('Store Manager Registration').should('have.text', 'Store Manager Registration');
        
        cy.get('button').should('exist');
        cy.get('div').should('exist');
        cy.get('.register__txt').should('exist');

        cy.get('label').should('exist');
        cy.get('.input__fields').should('exist');
        cy.get('button[type=submit]').click();
    })

    it('Login page Tests', () => { // Login Page Set of Tests
        cy.visit('http://localhost:3000/adminlogin');
        cy.contains('Register Account').should('exist');
        cy.contains('Forgot Password ? Reset Here').should('exist');
        cy.get('button').should('exist');
        cy.get('button[type=submit]').click(); // Click on a submit button
        cy.log('Going to Login');
        cy.contains('Login').click(); // Clicks on login button.
    });

    it('Login Page Link Tests', () => {
        cy.visit('http://localhost:3000/adminlogin');
        cy.url().should('include', '/adminlogin');
    });

    it('Register Page Tests Set II', () => {
        cy.visit('http://localhost:3000/register');
        cy.get('label').should('exist');
        cy.get('.username__box').get('label').contains('Username').should('exist');
        cy.get('.email__box').get('label').contains('E-mail Address').should('exist');
        cy.get('.email__label').type('email@testemail.com');
        cy.get('.password__box').get('label[for=password]').contains('Password').should('exist');
        cy.get('.confirm__passwordbox').get('label[for=confirmpassword]').contains('Confirm Password').should('exist');
    });

    it('Login Page Typing Tests Should Work Fine', () => {
        cy.visit('http://localhost:3000/adminlogin');
        cy.get('.email__label').type('email@testemail.com');
        cy.get('.password__label').type('password');
        cy.contains('Login').should('exist');
    })

    it('View Products Page Link Works', () => {
        cy.visit('http://localhost:3000/productslist');
        cy.url().should('include', '/productslist')
    });

    it('Accounting Page Tests', () => {
        cy.visit('http://localhost:3000/accounting');
        cy.contains('Accounting Analysis').should('exist');
        cy.contains('DE-Store Orders').should('have.text', 'DE-Store Orders')

        cy.contains('View Placed Orders').click();
    })

    it('Visit /forgotpassword', () => {
        cy.visit('http://localhost:3000/forgotpassword');
    })

    it('Forgot Password Page Tests', () => {
        cy.visit('http://localhost:3000/forgotpassword');
        cy.contains('Forgot Password').should('exist');
        cy.url().should('include', '/forgotpassword');
        cy.get('form[method=POST]').should('exist');
        cy.get('.forgot__box').get('label[for=email]').contains('E-mail Address').should('exist');
        cy.get('button[type=submit]').click();
        cy.get('label[for=email]').type('email@testemail.com').should('exist');
    })

    // Clears local storage
    it('Clear Local Storage', () => {
        cy.clearLocalStorage();
    })

})