const {MONGODB_URL} = require("../config/serverConfig");
const { MongoClient } = require('mongodb');
const client = new MongoClient(MONGODB_URL);
const { JWT_SECRET_KEY } = require("../config/serverConfig");    
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        console.log("Signup api hitted");
        const {email, password} = req.body;
        const user = { email: email, password: password };

        const db = client.db("viewers");
        const collection = db.collection("credentials");
        const alreadyFound = await collection.findOne({email: email});
        if (alreadyFound) {
            res.status(201).json({
                message: "Already user with this mail exists"
            });
            return;
        }

        const result = await collection.insertOne(user);
        const token = jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({
            err: {},
            message: "User-account created successfully",
            data: {
                token: token
            },
            success: true
        });
        return;
    } catch (error) {
        res.status(error.statusCode).json( {
            err: error.explaination,
            message: error.message,
            data: {},
            success: false
        });
        return;
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = {email: email, password: password};
        const db = client.db("viewers");
        const collection = db.collection("credentials");
        const result = await collection.findOne({email: email});
        if(!result) {
            res.status(400).json({
                err: {},
                message: "Please sign-up first",
                data: {},
                success: false
            });
            return;
        }
        else if (result.password != password) {
            res.status(401).json( {
                err: {},
                message: "Incorrect password",
                data: {},
                success: false
            });
            return;
        }
        const token = jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({
            err: {},
            message: "Logged in successfully",
            data: {
                token: token
            },
            success: true
        });
        return;
    } catch (error) {
        res.status(400).json({
            err: error.explaination,
            message: error.message,
            data: {},
            success: false
        });
        return;
    }
}

const browse = async (req, res) => {
    const {email, password} = req.user;
    res.status(200).json({
        message: "Brows route hit successfully",
        email: email
    });
}

module.exports = {
    signup,
    login,
    browse
}