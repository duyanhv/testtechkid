const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

let authen = function (username, password, cb) {
    userModel.findOne({ username: username }, (err, data) => {
        if (err) console.error(err);
        else if (!data) {
            var err = new Error('User not found');
            err.status = 401;
            cb(err);
        } else if (data) {
            console.log('====================');
            console.log(`password ${password}`);
            console.log(`password ${data.password}`);
            console.log('====================');
            if(password === data.password){
                return cb(null, {
                    isMatch: true,
                    user: data
                });
            }
            bcrypt.compare(password, data.password, (err, isMatch) => {
                if (isMatch === true) return cb(null, {
                    isMatch: isMatch,
                    user: data
                });
                cb(new Error('Wrong password'));
            });
        }
    });
}

let create = (data, cb) => {
    userModel.findOne({ username: data.username }, (err, findOneRes) => {
        if (err) console.error(err);
        if (findOneRes) {
            cb(null, 'USERNAME EXISTS')
            return;
        }

        userModel.create(data, (err, createRes) => {
            if (err) cb(err);
            cb(null, createRes);
        });
    });
}

let getAll = (cb) => {
    userModel.find({}, (err, res) => {
        if (err) cb(err);
        cb(null, res);
    });
}

let isAuthen = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/test2/login');
}

let findByUsername = (data, cb) =>{
    userModel.find({
        "username": {
            "$regex": data,
            "$options": "i"
        }
    }, (err, res) =>{
        if(err) console.error(err);
        cb(null, res);
    });
}

module.exports = {
    authen,
    create,
    getAll,
    isAuthen,
    findByUsername
}