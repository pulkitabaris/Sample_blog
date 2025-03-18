const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, isUpperCase: true, unique: true, index: "text" },
    password: { type: String, required: true },
    name: { type: String, required: true }  
}, {
    timestamps: true
})

module.exports = mongoose.model("user", userSchema);