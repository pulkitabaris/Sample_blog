const express = require("express");
const dotenv = require("dotenv").config()

const cors = require("cors");
const dbConnect = require("./utils/dbConnect");
const { notFound } = require("./middleware/errorHandler");

const app = express();
dbConnect();


const blogRoute = require("./routes/blogRoute");
const userRoute = require("./routes/userRoute");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors())

app.use("/blog", blogRoute);
app.use("/auth", userRoute);

app.use(notFound);

app.listen(process.env.PORT, () => {
    console.log("Server listening on " + process.env.PORT)
})