const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user-controller");
const { AuthRequestValidators } = require('../middlewares');

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/browse", AuthRequestValidators.verifyToken, UserController.browse);
router.post("/isTokenValid", AuthRequestValidators.verifyToken, UserController.isTokenValid);
router.get("/getMoviesData", AuthRequestValidators.verifyToken, UserController.giveMeMoviesData);
router.get("/getTrailersData", AuthRequestValidators.verifyToken, UserController.giveMeTrailersData);
router.get("/getPopularMoviesData", AuthRequestValidators.verifyToken, UserController.giveMePopularMoviesData);
router.get("/giveMeOpenAiResults", AuthRequestValidators.verifyToken, UserController.giveMeOpenAiResults);

module.exports = router;

