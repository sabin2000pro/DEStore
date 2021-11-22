// Copyright: All Rights Reserved - Sabin Constantin Lungu Edinburgh Napier University
// Code Author: Sabin Constantin Lungu
// Tests Written on: 25/10/2021
// Last Modified Date: 31/10/21 @ 10:32
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

describe('POST /api/v1/auth/login', () => {
    describe("Login a new admin with e-mail and password", () => { // Test Case 4
        test("Should respond with a 200 OK Status Code", async () => {
            const response = await request(server).post('/api/v1/auth/login').send({email: "adminadmin@gmail.com", password: "123mini123"});
            return expect(response.status).toBe(200);
        })
    })
});

describe('Test Case - Logout Successful by clearing cookie', () => {
    test('Should respond with 200 OK status code', async () => {
        const response = await request(server).get('/api/v1/auth/logout').send();
        return expect(response.status).toBe(200);
    })
})

describe("POST - /api/v1/auth/forgotPassword", () => { // Test Case 5
    describe("Sends back a 200 OK STATUS CODE - Means the e-mail has been sent successfully", () => {
        test("Respond back with 200 OK Status Code", async () => {
            const response = await request(server).post('/api/v1/auth/forgotPassword').send({email: "adminman@gmail.com"});
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


// * Test Passes
describe('Test Case - Admin REGISTER missing E-mail and password', () => { // Test Case 4 - Test Missing Admin E-mail and Password.
    test("Should respond with status code of 400", async () => {
        const bodyData = [{email: "email", password: "password"}];

        for (const body of bodyData) { // For every value in the body data array of objects
            const response = await request(server).post('/api/v1/auth/register').send(body);
            return expect(response.status).toBe(400);
        }
    })
});

describe('Test Case - Admin LOGIN Missing E-mail And Password Log in', () => {
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
        const notFound = 404;
        const bodyData = [{}];

        for(const body of bodyData) { // Loop through the data
            const response = await request(server).post('/api/v1/auth/forgotPassword').send(body);
            return expect(response.status).toBe(notFound);
        }

    })
});

describe('Test Case - Products missing name and description', () => { // Test Case 5
    test("Should respond with a status code of 400", async () => {
        const bodyData = [{}];

        for(const body of bodyData) {
            const response = await request(server).post('/api/v1/products').send(body);
            return expect(response.status).toBe(404);
        }
    })
 })

 describe('Test Case - Forgot Password Invalid Data Type', () => {
    test('Should respond with a status code of 500', async () => {
        const bodyData = [{"email": 349}];
        const serverError = 500;

        for(const body of bodyData) {
            const response = await request(server).post('/api/v1/auth/forgotPassword').send(body);
            return expect(response.status).toBe(serverError);
        }

    })
});

describe('Test Case - Forgot Password Invalid E-mail Address', () => {
    test('Should respond with a status code of 500', async () => {
        const bodyData = [{"email": "sabinlungu0000000@gmail.com"}]

        for(const body of bodyData) {
            const response = await request(server).post('/api/v1/auth/forgotPassword').send(body);
            return expect(response.status).toBe(500);
        }

    })
});

describe('Test Case - Admin Register - Invalid Username Data Type', () => {
    test('Should respond with a status code of 400', async () => {
        const bodyData = [{"username": 1234}];

        for(const body of bodyData) {
            const response = await request(server).post('/api/v1/auth/register').send(body);
            return expect(response.status).toBe(400);
        }

    })
});

describe('Test Case - Admin Login - Invalid E-mail and Username Data Types', () => {
    test('Should respond with a 400 Bad Request Status Code', async () => {
        const bodyData = [{"email": 123, "password": 555}];

        for(const body of bodyData) {
            const response = await request(server).post('/api/v1/auth/login').send(body);
            return expect(response.status).toBe(400);
        }
    })
})