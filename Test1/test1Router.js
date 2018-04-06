const express = require('express');
const Router = express.Router();
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const util = require('util');

const pascalTriangle = require('../algorithm/pascalTriangle');


Router.get('/', (req, res) => {
    res.render('pascaltriangle');
});

Router.post('/api/generate', (req, res) => {
    res.send(pascalTriangle.pascalTriangle(req.body.pascaltriangle));
})

module.exports = Router;
