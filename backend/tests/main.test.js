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

describe('GET /admins', () => { // Returns all of the admins - TEST SHOULD PASS as the expected HTTP status code should be 200
    describe('Should return all of the Admins in the database', () => {
        test('Admin Test - Should response with a 200 status code', async () => {
            const admins = await request(server).get('/')
        })
    })
})