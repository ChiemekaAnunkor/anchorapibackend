const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "../.env" })

const expiration = '1h';

const secret = process.env.SECRET_TOKEN
console.log(secret)
module.exports = {
    signInToken: function ({ email, name, _id }) {
        const payload = { email, name, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};