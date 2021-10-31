// Copyright: All Rights Reserved - Sabin Constantin Lungu Edinburgh Napier University
// Code Author: Sabin Constantin Lungu
// Tests Written on: 25/10/2021
// Last Modified Date: 27/10/2021 @ 09:55
// Bugs? N/A

const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../server');
const Admin = require('../models/adminModel');
const Product = require('../models/productModel');

// * Test Passes
beforeAll(async() => { // Test DB connection
 const url = 'mongodb+srv://sabin2000:123mini123@cluster0.sjkmj.mongodb.net/destore?retryWrites=true&w=majority';
 return await mongoose.connect(url);
});

// * Test Passes
describe('GET /products', () => { // Test Case 1
    describe('Should return all of the Products', () => {
        test('Should respond with a 200 status code', async () => {

            const response = await request(server).get('/api/v1/products').send(); // Send over the request to the server
            return expect(response.status).toBe(200); // Send back response
        })
    })
});

// * Test Passes
describe('POST /products', () => { // Test Case 2
    describe('Create a product given the name, image, description, price, quantity, saleOffer and colour', () => {
        test("Should respond with a 201 status code", async () => {
            const response = await request(server).post('/api/v1/products').send({name: "Test Product 2", "image": "https://i.ebayimg.com/images/g/PTgAAOSwWnpdNGeL/s-l500.jpg", "description": "A nice", "price": 299.99, "quantity": 2, "saleOffer": "Buy 1 get 1 free", "colour": "SSpace gray"});
            return expect(response.status).toBe(201);
        })
    })
});

describe('POST /api/v1/auth/register', () => {
    describe('Registering a new admin with e-mail, username and password', () => {
        test("Should respond with a 201 created status code", async () => {
            const response = await request(server).post('/api/v1/auth/register').send({username: "testadmin", email: "testadmin2@gmail.com", password: "testadminlol12345"});
            return expect(response.status).toBe(201);
        })
    })
})

// * Test Passes
describe('GET /admins', () => { // Test Case 3 - Returns all of the admins - TEST SHOULD PASS as the expected HTTP status code should be 200
    describe('Should return all of the Admins in the database', () => {
        test('Admin Test - Should response with a 200 status code', async () => {
            const admins = await request(server).get('/')
        })
    })
})

// * Test Passes
describe('Test Case - Admin missing E-mail and password', () => { // Test Case 4 - Test Missing Admin E-mail and Password.
    test("Should respond with status code of 400", async () => {
        const bodyData = [{email: "email", password: "password"}];

        for (const body of bodyData) { // For every value in the body data array of objects
            const response = await request(server).post('/api/v1/auth/register').send(body);
            return expect(response.status).toBe(400);
        }
    })
})

// describe('Test Case - Products missing name and description', () => { // Test Case 5
//     test("Should respond with a status code of 400")
// })