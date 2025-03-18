const User = require("../models/userModel");
const { errorHandl }  = require("../middleware/errorHandler");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
    try {
        const { email, password, confirmPassword, name } = req.body;
        if(password != confirmPassword) throw new Error("Password and confirm password must be same");

        const user = await User.findOne({ email: email.toLowerCase() });
        if(user) throw new Error("Account already exist")
        
        const newUser = await User.create(req.body);
        res.json({
            error: false,
            status: 200,
            message: "User created Successfully!"
        })
    }
    catch(error) {
        errorHandl(res, error, 401);    
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user  = await User.findOne({ email: email.toLowerCase() });
        if(!user) throw new Error("Account Doesn't Exist")
        
        if(user.password == password) {
            res.json({
                error: false,
                status: 200,
                message: "Login Succesfully!",
                data: {
                    user_id: jwt.sign({ user_id: user._id }, process.env.JWT_SECRET)
                }
            })
        }
        else {
            throw new Error("Password is wrong")
        }
    }
    catch(error) {
        errorHandl(res, error, 401);    
    }
}

module.exports = {
    signUp,
    login
}