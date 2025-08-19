const bcrypt = require('bcrypt');
const db = require('../../../../../databases/models');
const User = db.User;
const Token = db.Token;
const { generateRefreshToken,generateAccessToken, verifyRefreshToken } = require('../services/authService.js');
const { where } = require('sequelize');
const { LoginSchema } = require('../validator/authValidation.js');

const login = async(req,res)=>{
    const { error,value } = LoginSchema.validate(req.body);
    try{

        if(error){
            return res.status(400).json({message: error.details[0].message});
        }
        const {email,password} = value;
        const user = await User.findOne({where: { email }});
        if(!user){
            return  res.status(401).json({message: "Invalid Credentials"});
        }
        const validPassword = await bcrypt.compare(password,user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
    
        const payload = {email};
        const accessToken = generateAccessToken(payload)
        const refreshToken = generateRefreshToken(payload);
    
        await Token.create({email,accessToken,refreshToken});
        return res.status(200).json({
            message:"login successfully",
            accessToken,
            refreshToken
        })
    }catch(err){
        console.error("Error during login:", err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

const refreshToken = async(req,res)=>{
    const { token } = req.body;

    if(!token){
        return res.status(401).json({message: "Refresh Token Required"});
    }
    try{
        const payload = verifyRefreshToken(token);
        const newAccessToken = generateAccessToken({ email:payload.email });
        const newRefresToken = generateRefreshToken({ email:payload.email });

        await Token.update({accessToken: newAccessToken,refreshToken:newRefresToken},{where: {refreshToken: token}});
        res.status(200).json({
            message:"Token Refreshed Successfully",
            accessToken: newAccessToken,
            refreshToken: newRefresToken
        });
    }catch(err){
        return res.status(403).json({message: "Invalid or expired Refresh Token"});
    }

}
module.exports = { login,refreshToken }