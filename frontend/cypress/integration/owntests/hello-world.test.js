/// <reference types = "cypress" />

describe('Test Suite 1', () => {

    it('We have correct page title', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Homepage');
    });

    it('Register Page Tests', () => { // Test that page has existing title
        cy.visit('http://localhost:3000/register');
        cy.contains('Store Manager Registration').should('exist')
        
        cy.get('button');
        cy.get('div');
        cy.get('.register__txt');
    })


})