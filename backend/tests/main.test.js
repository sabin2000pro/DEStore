// Copyright: All Rights Reserved - Sabin Constantin Lungu Edinburgh Napier University
// Code Author: Sabin Constantin Lungu
// Tests Written on: 25/10/2021
// Last Modified Date: 31/10/21 @ 10:32
// Modification Description: 
// Bugs? N/A

const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../server');
const Admin = require('../models/adminModel');
const Product = require('../models/productModel');
const Payment = require('../models/paymentModel');

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
            const response = await request(server).post('/api/v1/products').send({name: "Test Product 6", "image": "https://i.ebayimg.com/images/g/PTgAAOSwWnpdNGeL/s-l500.jpg", "description": "A nice product", "price": 600.99, "quantity": 3, "saleOffer": "Buy 1 get 1 free", "colour": "Black"});
            return expect(response.status).toBe(201);
        })
    })
});

describe('POST /api/v1/auth/register', () => {
    describe('Registering a new admin with e-mail, username and password', () => {
        test("Should respond with a 201 created status code", async () => {
            const response = await request(server).post('/api/v1/auth/register').send({username: "newtestlol", email: "newtestloll@gmail.com", password: "newtestloll"});
            return expect(response.status).toBe(201);
        })
    })
});

describe('POST /api/v1/auth/login', () => {
    describe("Login a new admin with e-mail and password", () => {
        test("Should respond with a 200 OK Status Code", async () => {
            const response = await request(server).post('/api/v1/auth/login').send({email: "testagain@gmail.com", password: "testagain"});
            return expect(response.status).toBe(200);
        })
    })
});

describe("POST - /api/v1/auth/forgotPassword", () => {
    describe("Sends back a 200 OK STATUS CODE - Means the e-mail has been sent successfully", () => {
        test("Respond back with 200 OK Statsu Code", async () => {
            const response = await request(server).post('/api/v1/auth/forgotPassword').send({email: "sabinlungu200@gmail.com"});
            return expect(response.status).toBe(200);
        })
    })
})

// * Test Passes
describe('GET /admins', () => { // Test Case 3 - Returns all of the admins - TEST SHOULD PASS as the expected HTTP status code should be 200
    describe('Should return all of the Admins in the database', () => {
        test('Admin Test - Should response with a 200 status code', async () => {
            const response = await request(server).get('/api/v1/auth/getAdmins').send();
            return expect(response.status).toBe(200);
        })
    })
});

describe('Test Case - Returns all Payments', () => {
    describe("Test Case - Get All Payments Should Return 200 OK Status Code", () => {
        test("Payment Test - Return 200 OK Status Code", async () => {
            const response = await request(server).get('/api/v1/payment/getAllPayments').send();
            return expect(response.status).toBe(200);
        })
    })
})

// TEST CASE TO VERIFY THAT A PAYMENT CAN BE CREATED
describe("Test Case - Create a Payment with name, card type, card number, expiry date and the code", () => {
    describe("Should respond with a status code of 201 CREATED", () => {
        test('Payment Test - Should Respond with 201 Created', async () => {
            const response = await request(server).post('/api/v1/payment/createPayment').send({cardholderName: "Test Name", cardType: "VISA", cardNumber: "9009 1844 5675 9091", expiryDate: "03/11/2023", code: 944});
            return expect(response.status).toBe(201);
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
});

describe('Test Case - Admin Missing E-mail And Password Log in', () => {
    test("Should respond with status code of 400", async () => {
        const bodyData = [{email: "emal", password: "password"}];

        for(const body of bodyData) {
            const response = await request(server).post('/api/v1/auth/login').send(body);
            return expect(response.status).toBe(400);
        }
    })
})

describe('Test Case - Forgot Password Missing E-mail', () => {
    test("Should Respond with a Status Code of 400", async () => {
        const bodyData = [{}];

        for(const body of bodyData) {
            const response = await request(server).post('/api/v1/auth/forgotPassword').send(body);
            return expect(response.status).toBe(404);
        }
    })
})

// describe('Test Case - Products missing name and description', () => { // Test Case 5
//     test("Should respond with a status code of 400")
// })