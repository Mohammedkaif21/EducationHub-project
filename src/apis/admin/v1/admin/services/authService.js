const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN;
const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES;
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES;
const RESET_TOKEN_SECRET = process.env.JWT_RESET_TOKEN;
const RESET_TOKEN_EXPIRES = process.env.JWT_RESET_EXPIRES;

const generateAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_EXPIRES_IN
    })
}
const generateRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_EXPIRES_IN
    })
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);

}
const generateResetToken = (email) => {
    return jwt.sign({ email }, RESET_TOKEN_SECRET, {
        expiresIn: RESET_TOKEN_EXPIRES
    })
}
const verifyResetToken = (token) => {
    return jwt.verify(token, RESET_TOKEN_SECRET);
}
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    generateResetToken,
    verifyResetToken
}