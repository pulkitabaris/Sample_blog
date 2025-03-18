const mongoose = require("mongoose");

const connect = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully!");
    }
    catch(error) {
        console.log("Database not connected: " + error.message);
    }
}

module.exports = connect;