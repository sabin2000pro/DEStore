/// <reference types = "cypress" />

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

    it('Register Page Tests', () => { // Test that page has existing title
        cy.visit('http://localhost:3000/register');
        cy.contains('Store Manager Registration').should('have.text', 'Store Manager Registration');
        
        cy.get('button').should('exist');
        cy.get('div').should('exist');
        cy.get('.register__txt').should('exist');

        cy.get('label').should('exist');
        cy.get('.input__fields').should('exist');
    })

    it('Login page Tests', () => {
        cy.visit('http://localhost:3000/adminlogin');
        cy.contains('Register Account').should('exist');
        cy.contains('Forgot Password ? Reset Here').should('exist');
        cy.get('button').should('exist');
        cy.log('Going to Login');
        cy.contains('Login').click();

    });

    it('Login Page Link Tests', () => {
        cy.visit('http://localhost:3000/adminlogin');
        cy.url().should('include', '/adminlogin');
    });

    it('Register Page Typing Tests Should Work Fine', () => {
        cy.visit('http://localhost:3000/register');
        cy.get('label').should('exist');
        cy.get('.username__box').get('label').contains('Username').should('exist');
        cy.get('.email__box').get('label').contains('E-mail Address').should('exist');
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

})