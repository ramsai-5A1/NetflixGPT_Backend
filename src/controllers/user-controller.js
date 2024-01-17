const {MONGODB_URL} = require("../config/serverConfig");
const { MongoClient } = require('mongodb');
const client = new MongoClient(MONGODB_URL);
const { JWT_SECRET_KEY } = require("../config/serverConfig");    
const jwt = require("jsonwebtoken");
const {MOCK_DATA_1} = require("../utils/Mocks/movies_list_mock");

const signup = async (req, res) => {
    try {
        console.log("Signup api hitted");
        const {fullName, email, password} = req.body;
        const user = { email: email, password: password };

        const db = client.db("viewers");
        const collection = db.collection("credentials");
        const alreadyFound = await collection.findOne({email: email});
        if (alreadyFound) {
            return res.status(201).json({
                message: "Already user with this mail exists"
            });
        }

        const result = await collection.insertOne({...user, fullName: fullName});
        const token = jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.status(201).json({
            err: {},
            message: "User-account created successfully",
            data: {
                token: token,
                fullName: fullName,
                email: email
            },
            success: true
        });
    } catch (error) {
        return res.status(error.statusCode).json( {
            err: error.explaination,
            message: error.message,
            data: {},
            success: false
        });
    }
}

const login = async (req, res) => {
    try {
        console.log("Login api hitted");
        const {email, password} = req.body;
        const user = {email: email, password: password};
        const db = client.db("viewers");
        const collection = db.collection("credentials");
        const result = await collection.findOne({email: email});
        if(!result) {
            return res.status(201).json({
                err: {},
                message: "Please sign-up first",
                data: {},
                success: false
            });
        }
        else if (result.password != password) {
            return res.status(401).json( {
                err: {},
                message: "Incorrect password",
                data: {},
                success: false
            });
        }
        const token = jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({
            err: {},
            message: "Logged in successfully",
            data: {
                token: token,
                fullName: result.fullName,
                email: result.email
            },
            success: true
        });
    } catch (error) {
        return res.status(400).json({
            err: error.explaination,
            message: error.message,
            data: {},
            success: false
        });
    }
}

const browse = async (req, res) => {
    try {
        console.log("Browse api hitted");
        const {email, password} = req.user;
        return res.status(200).json({
            message: "Brows route hit successfully",
            email: email
        });
    } catch (error) {
        return res.status(400).json({
            err: error.explaination,
            message: error.message,
            data: {},
            success: false
        });
    }
}

const isTokenValid = async (req, res) => {
    return res.status(200).json({
        status: true
    });
}

const giveMeMoviesData = async (req, res) => {
    console.log("Control Reached giveMeMoviesData api");
    const data = MOCK_DATA_1;
    res.status(201).json({
        videosData: data,
    });
}

module.exports = {
    signup,
    login,
    browse,
    isTokenValid, 
    giveMeMoviesData
}