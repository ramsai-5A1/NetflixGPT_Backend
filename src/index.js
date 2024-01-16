const bodyParser = require('body-parser');
const express = require("express");
const app = express();
app.use(bodyParser.json());

const { PORT } = require("./config/serverConfig");
const { MongoClient } = require('mongodb');
const { MONGODB_URL } = require("./config/serverConfig");
const client = new MongoClient(MONGODB_URL);

app.post("/signup", (req, res) => {
    const {email, password} = req.body;
    const userData = { email: email, password: password};
    const db = client.db('viewers');
    const collection = db.collection("credentials");
    const result = collection.insertOne(userData);
    console.log(result);

    res.status(201).json({
        status: "Inserted successfully"
    });
});

app.get("/dummy", (req, res) => {
    res.status(200).json({
        message: "All fine with updated changes"
    });
});

const startTheServer = () => {
    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    });
}
startTheServer();


const connectToMongoDb = () => {
    client.connect()
        .then(() => {
            console.log("Connected to MONGODB successfully");
        })
        .catch((err) => {
            console.error("Error while connecting to mongodb", err);
        });

    process.on('SIGINT', () => {
        client.close();
        process.exit();
    });
}
connectToMongoDb();

// const db = client.db('viewers');
// const collection = db.collection('credentials');
// const userData = { email: "venky@gmail.com", password: "Venky@123" };
// const result = collection.insertOne(userData);
// console.log("Inserted successfully");



