const User = require("../models/userModel");
const { errorHandl }  = require("../middleware/errorHandler");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ");
        if(token[1]) {
            const verify = await jwt.verify(token[1], process.env.JWT_SECRET);
            const user = await User.findById(verify.user_id);
            if(!user) throw new Error("Please login Again!");

            req.user = user._id;
            next()
        }
        else {
            throw new Error("Please login first!")
        }
    }
    catch(error) {
        errorHandl(res, error, 401);    
   
    }
}

module.exports = {
    authMiddleware
}