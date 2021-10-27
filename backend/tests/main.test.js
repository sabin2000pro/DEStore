const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../server');
const Admin = require('../models/adminModel');
const Product = require('../models/productModel');

// BUG: Needs to be sorted before other tests
beforeAll(async() => { // Test DB connection
 const url = 'mongodb+srv://sabin2000:123mini123@cluster0.sjkmj.mongodb.net/destore?retryWrites=true&w=majority';
 return await mongoose.connect(url);
});

describe('GET /products', () => {
    describe('Should return all of the Products', () => {
        test('Should respond with a 200 status code', async () => {

            const response = await request(server).get('/api/v1/products').send();
            return expect(response.status).toBe(200);
        })
    })
});

describe('POST /products', () => {
    describe('Create a product given the name, image, description, price, quantity, saleOffer and colour', () => {
        test("Should respond with a 201 status code", async () => {
            const response = await request(server).post('/api/v1/products').send({name: "Test Product 2", "image": "https://i.ebayimg.com/images/g/PTgAAOSwWnpdNGeL/s-l500.jpg", "description": "A nice", "price": 299.99, "quantity": 2, "saleOffer": "Buy 1 get 1 free", "colour": "SSpace gray"});
            return expect(response.status).toBe(201);
        })
    })
})

describe('GET /admins', () => { // Returns all of the admins - TEST SHOULD PASS as the expected HTTP status code should be 200
    describe('Should return all of the Admins in the database', () => {
        test('Admin Test - Should response with a 200 status code', async () => {
            const admins = await request(server).get('/')
        })
    })
})

// Test for missing Admin E-mail and password
describe('Test Case - Admin missing E-mail and password', () => {
    test("Should respond with status code of 400", async () => {
        const bodyData = [{email: "email", password: "password"}];

        for (const body of bodyData) {
            const response = await request(server).post('/api/v1/auth/register').send(body);
            return expect(response.status).toBe(400);
        }
    })
})

describe('Test Case - Products missing name and description', () => {
    test("Should respond with a status code of 400")
})