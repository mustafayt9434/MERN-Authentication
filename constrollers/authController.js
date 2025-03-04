const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
require('dotenv').config();
module.exports = {
    signUp: async (req, res) => {
        try {
            const user = new User({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                profile: req.file?.filename,
            })
            await user.save()
            const token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email,
                profile: user.profile
            }, process.env.JWT_SECRET)
            return res.status(200).json({user: user.toJSON(), token})
        } catch (error) {
            return res.status(500).send({error: error.message});
        }
    },
    logIn: async (req, res) => {
        try {
            const user = await User.findOne({email: req.body.email})
            if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
                throw new Error('Incorrect user credentials');
            }
            const token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email,
                profile: user.profile
            }, process.env.JWT_SECRET)
            return res.status(200).json({user: user.toJSON(), token})
        } catch (error) {
            return res.status(500).send({error: error.message});
        }
    }
}