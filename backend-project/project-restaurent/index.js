const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dbConnect = require("./config/dbConnection");
require("dotenv").config();

const port = process.env.PORT || 5050;
const app = express();

dbConnect();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req,res) => {
    res.send("Hello restaurent users");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});