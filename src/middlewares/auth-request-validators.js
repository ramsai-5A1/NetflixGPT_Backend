const { JWT_SECRET_KEY } = require("../config/serverConfig");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const mainToken = req.headers.authorization;
    const token = mainToken && mainToken.split(" ")[1];
    if (!token) {
        return res.status(403).json({
            message: "No Auth token is present"
        });
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(404).json({
                message: "Invalid token"
            });
        }
        req.user = decoded;
        next();
    });
}

module.exports = {
    verifyToken
}