const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');

const config = require('./config');

let app = express();
const Router = express.Router();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.engine("handlebars", handlebars({ defaultLayout: 'index' }));
app.set("view engine", "handlebars");

var sessionStore = new expressSession.MemoryStore();
const session = expressSession({
    name: 'cookiename',
    store: sessionStore,
    secret: 'duyanhv',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: null }
});

app.use(session);

const test1 = require('./Test1/test1Router');
const test2 = require('./Test2/test2Router');

app.use('/test1', test1);
app.use('/test2', test2);

app.use(express.static('public'));

mongoose.connect(config.connectionString,
(err) => {
    if (err) console.log(err);
    console.log("Connect successfully");
});

app.listen(config.port, (err, res) => {
if (err) {
    console.log(err);
} else {
    console.log(`running on port ${config.port}`);
}

});