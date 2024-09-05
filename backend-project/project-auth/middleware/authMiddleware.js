const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {

    try {
        // to get authorization for token
        const { authorization } = req.headers;

        // check if the  user have authoriz for new process or not
        // if not halt the process
        if (!authorization) {
            return res.status(401).send({ message: "failed to access, unauthorized user" });
        }

        // if user authorized get token from header
        const getTokens = authorization.startsWith("Bearer");

        // if the token not get halt the process
        if (!getTokens) {
            return res.status(400).send("failed to accees");
        }

        //  get token from authorization by avoiding barere
        const getToken = await authorization.split(' ')[1]
        req.user = jwt.verify(getToken, process.env.SECRET_KEY);
        
        // if every thing is complete user abale to use next step
        next();

    } catch (error) {
        res.status(401).send("login first");
        console.error(error);
    }
}
module.exports = authMiddleware;
