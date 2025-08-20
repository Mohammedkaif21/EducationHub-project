const bcrypt = require('bcrypt');
const db = require('../../../../../databases/models');
const User = db.User;
const Token = db.Token;
const { generateRefreshToken, generateAccessToken, verifyRefreshToken, generateResetToken, verifyResetToken } = require('../services/authService.js');
const { LoginSchema } = require('../validator/authValidation.js');
const axios = require('axios');
const sendMail = require('../utils/mailer.js');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');
require('dotenv').config()

const login = async (req, res) => {
    const { error, value } = LoginSchema.validate(req.body);
    try {

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { email, password, captcha } = value;
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const verifyURL = `https://www.google.com/recaptcha/api/siteverify`
        const { data } = await axios.post(
            verifyURL,
            new URLSearchParams({
                secret: secretKey,
                response: captcha
            }).toString(),
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
        )
        if (!data.success) {
            return res.status(400).json({ message: "Failed Captcha verification" })
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const payload = { email };
        const accessToken = generateAccessToken(payload)
        const refreshToken = generateRefreshToken(payload);

        await Token.create({ email, accessToken, refreshToken });
        return res.status(200).json({
            message: "login successfully",
            accessToken,
            refreshToken
        })
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const refreshToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ message: "Refresh Token Required" });
    }
    try {
        const payload = verifyRefreshToken(token);
        const newAccessToken = generateAccessToken({ email: payload.email });
        const newRefresToken = generateRefreshToken({ email: payload.email });

        await Token.update({ accessToken: newAccessToken, refreshToken: newRefresToken }, { where: { refreshToken: token } });
        res.status(200).json({
            message: "Token Refreshed Successfully",
            accessToken: newAccessToken,
            refreshToken: newRefresToken
        });
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired Refresh Token" });
    }

}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const token = generateResetToken(email);
        const resetLink = `http://localhost:5173/reset-password?token=${token}`;

        await sendMail(
            user.email,
            "Reset your password",
            `<p>Hello ${user.name},</p>
            <p>Click here: <a href="${resetLink}">${resetLink}</a></p>
            <p>This link will expires in 15 minutes</p>`
        );
        res.status(200).json({ message: "Password reset link sent to email" })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" })
    }

}
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {

        let decoded;
        try {
            decoded = verifyResetToken(token)
        } catch (err) {
            console.error("Invalid reset token", err);
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        // console.log(token);

        const user = await User.findOne({ where: { email: decoded.email } });
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.update(
            { password: hashedPassword },
            { where: { email: decoded.email } }
        );
        res.status(200).json({ message: "Password reset successfully" })
    } catch (err) {
        console.error("Reset Password Error", err);
        return res.status(500).json({ message: "Something went wrong?" })
    }
}
module.exports = { login, refreshToken, forgotPassword, resetPassword }
