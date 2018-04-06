const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT = 10;

const UserSchema = new Schema({
    username: { type: String, lowercase: true, trim: true, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: {type: String, required: true},
    fullname: {type: String, required: true}
});

UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});


var User = mongoose.model('tblusers', UserSchema);

module.exports = User;