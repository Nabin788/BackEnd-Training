const jwt = require("jsonwebtoken");
require("dotenv").config();

const authUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const tokenKey = await authorization.split(" ")[1];

        const userVerify = jwt.verify(tokenKey, process.env.SECRETKEY);
        next();
    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "Failed to authorized the user.",
            error
        });
    }
}

module.exports = authUser;