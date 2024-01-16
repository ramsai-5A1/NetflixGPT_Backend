const {MONGODB_URL} = require("../config/serverConfig");
const { MongoClient } = require('mongodb');
const client = new MongoClient(MONGODB_URL);

const signup = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = { email: email, password: password };
        const db = client.db("viewers");
        const collection = db.collection("credentials");
        const alreadyFound = await collection.findOne({email: email});
        if (alreadyFound) {
            res.status(400).json({
                message: "Already user with this mail exists"
            });
            return;
        }
        const result = await collection.insertOne(user);
        res.status(201).json({
            err: {},
            message: "User-account created successfully",
            data: {},
            success: true
        });
        return;
    } catch (error) {
        res.status(error.statusCode).json( {
            err: error.explaination,
            message: error.message,
            data: {},
            success: false
        })
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = {email: email, password: password};
    const db = client.db("viewers");
    const collection = db.collection("credentials");
    const result = await collection.findOne({email: email});
    if(!result) {
        res.status(400).json({
            message: "Please sign-up first"
        });
        return;
    }
    else if (result.password != password) {
        res.status(401).json( {
            message: "Incorrect password"
        });
        return;
    }
    res.status(200).json({
        message: "Logged in successfully"
    });
}

module.exports = {
    signup,
    login
}