const express = require("express");
const userRouter = require("./router/userRoutes.js");

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use("/register", userRouter);

app.listen(port, () => {
    console.log("server is running on:", port);
});
