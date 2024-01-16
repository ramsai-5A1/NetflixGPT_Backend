const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user-controller");
const { AuthRequestValidators } = require('../middlewares');

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/browse", AuthRequestValidators.verifyToken, UserController.browse);
router.post("/isTokenValid", AuthRequestValidators.verifyToken, UserController.isTokenValid);

module.exports = router;

