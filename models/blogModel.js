const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
   age: { type: Number, required: true },
   description: { type: String, required: true },
   title: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
}, {
    timestamps: true
})

module.exports = mongoose.model("blog", blogSchema);