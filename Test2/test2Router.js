const express = require('express');
const Router = express.Router();
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const util = require('util');

const userController = require('../controller/userController');
const isAuthen = userController.isAuthen;

Router.get('/', (req, res) => {
    if (typeof req.session !== 'undefined') {
        res.redirect('/test2/userlist');
    } else {
        res.redirect('/test2/login');
    }
});

Router.get('/login', (req, res) => {
    res.render('login');
});

Router.post('/api/login', (req, res) => {
    userController.authen(req.body.username, req.body.password, (err, data) => {
        if (err) console.error(err);
        if (data) {
            if (data.isMatch) {
                req.session.regenerate(() => {
                    req.session.user = data;
                    // res.send(data.user._id);
                    res.redirect('/test2/userlist')
                });
            } else {
                req.session.error = 'Authen failed'
                res.redirect('/test2/login');
            }
        } else {
            console.log('failed');
        }
    });
});


Router.get('/register', (req, res) => {
    res.render('register');
});

var username = "";
Router.post('/api/register', (req, res) => {
    if (req.body.password == req.body.confirmPassword) {
        username = req.body.username;
        userController.create(req.body, (err, createRes) => {
            if (err) console.error(err);
            // console.log(res);
            if (!createRes) {
                res.send('SomeThingWrong');
                return;
            }

            if (createRes === 'USERNAME EXISTS' && typeof username !== 'undefined') {
                res.json({
                    usernameExists: true,
                    username: username
                });
                return;
            }
            console.log(createRes);
            userController.authen(createRes.username, createRes.password, (err, data) => {
                if (err) console.error(err);
                if (data) {
                    console.log(data);
                    if (data.isMatch) {
                        req.session.regenerate(() => {
                            req.session.user = data;
                            // res.send(data.user._id);
                            res.redirect('/test2/userlist');
                        });
                    } else {
                        req.session.error = 'Authen failed'
                        res.redirect('/test2/login');
                    }
                } else {
                    console.log('failed');
                }
            });
            // res.json({
            //     usernameExists: false
            // });
        });
        return;
    }

    res.json({
        requestConfirmPwd: true
    })

});

Router.get('/userlist', isAuthen, (req, res) => {
    userController.getAll((err, getAllRes) => {
        if (err) console.error(err);

        res.render('userlist',{
            getAllRes : getAllRes
        });

    });
});

Router.post('/api/userlist', isAuthen, (req,res) =>{
    userController.findByUsername(req.body.username, (err, searchRes) =>{
        if(err) console.error(err);
        res.render('userlist',{
            getAllRes : searchRes
        });
    });
});

Router.get('/logout', isAuthen, (req, res) => {
    req.session.destroy(() => {
        res.send('destroyed');
    });
})

module.exports = Router;