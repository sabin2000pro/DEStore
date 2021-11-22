/// <reference types = "cypress" />

describe('Test Suite 1', () => {

    it('We have correct page title', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Homepage');
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
        cy.get('input').should('exist');
        cy.get('.input__fields').should('exist');
    })

    it('Login page Tests', () => {
        cy.visit('http://localhost:3000/adminlogin');
        cy.contains('Register Account').should('exist');
        cy.contains('Forgot Password ? Reset Here').should('exist');
        cy.get('button').should('exist');
        cy.contains('Login').click();

    });

    it('Login Page Link Tests', () => {
        cy.visit('http://localhost:3000/adminlogin');
        cy.url().should('include', '/adminlogin');
    });

    it('View Products Page Link Works', () => {
        cy.visit('http://localhost:3000/productslist');
        cy.url().should('include', '/productslist')
    })

})