const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    description: { type: String },
    address: { type: String },
    profession: { type: String },
    profilePhoto: { type: String },
    salt: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.password;
    }
})

module.exports = mongoose.model('User', userSchema);