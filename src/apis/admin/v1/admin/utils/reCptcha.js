const axios = require('axios');
require('dotenv').config()

const verifyRecaptcha = async (token) => {
    try {
        if(!token) return false
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const verifyURL = `https://www.google.com/recaptcha/api/siteverify`;
        const { data } = await axios.post(
            verifyURL,
            new URLSearchParams({
                secret: secretKey,
                response: token,
            }).toString(),
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
        )
        console.log("reCAPTCHA response:", data);
        return data.success
    } catch (err) {
        console.error("reCAPTCHA error:", err.message);
        return false;
    }

}
module.exports = verifyRecaptcha;
