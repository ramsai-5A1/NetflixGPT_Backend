const bodyParser = require('body-parser');
const express = require("express");
const apiRoutes = require("./routes/index");
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { PORT } = require("./config/serverConfig");
const { MONGODB_URL } = require("./config/serverConfig");

const app = express();

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
// };
  
// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());
app.use("/api", apiRoutes);

app.post("/temp", (req, res) => {
    console.log("Reached temp api");
    console.log(req.body);
    res.status(200).json({
        message: "Temp1"
    });
})

app.get("/dummy", (req, res) => {
    console.log("Reached dummy api");
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
    const client = new MongoClient(MONGODB_URL);
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


