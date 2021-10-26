const request = require('supertest');
const mongoose = require('mongoose');
const server = require('./server');
const Admin = require('../models/adminModel');
const Product = require('../models/productModel');