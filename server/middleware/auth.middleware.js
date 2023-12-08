const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token === "null") {
            return res.status(401).json({message: "Token hasn't find!"});
        }

        const decode = jwt.verify(token, config.get("secretKey"));

        req.user = decode;
        next();
    } catch (e) {
        return res.status(401).json({message: "Middleware error: " + e});
    }
}