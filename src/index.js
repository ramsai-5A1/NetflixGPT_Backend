const express = require("express");
const app = express();

const { PORT } = require("./config/serverConfig");

//mongodb://localhost:27017

app.get("/dummy", (req, res) => {
    res.status(200).json({
        message: "All fine with updated changes"
    });
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});