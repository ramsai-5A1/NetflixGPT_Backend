const express = require("express");
const app = express();

const { PORT } = require("./config/serverConfig");
const { MongoClient } = require('mongodb');

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
    const mongodbUrl = "mongodb://localhost:27017";
    const client = new MongoClient(mongodbUrl);
    
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



