const express = require('express');
const {signUp, logIn} = require("../constrollers/authController");
const upload = require("../middlewares/uploadProfile");
const router = express.Router();
router.post('/signup', upload.single("profile") , signUp);
router.post('/login', logIn);

module.exports = router;