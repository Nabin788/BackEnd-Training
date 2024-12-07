const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dbConnect = require("./config/dbConnection");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes.js");
const restaurentRoutes = require("./routes/restaurentRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");

const port = process.env.PORT || 5050;
const app = express();

dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/user", authRoutes);
app.use("/data", restaurentRoutes);
app.use("/api", categoryRoutes);

app.get("/", (req, res) => {
    res.send("Hello restaurent users");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});