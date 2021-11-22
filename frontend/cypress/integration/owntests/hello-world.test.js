/// <reference types = "cypress" />

describe('Basic Tests', () => {

    it('We have correct page title', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Homepage');
    });

    it('Correct Register page Title', () => {
        cy.visit('http://localhost:3000/register');
        cy.contains('Store Manager Registration');
    })


})