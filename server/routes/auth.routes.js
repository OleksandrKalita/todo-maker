const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/registration", async (req, res) => {
    try {
        const data = req.body;

        const isUser = await User.findOne({email: data.email});
        if (isUser) {
            return res.status(404).json({message: `User with email:${data.email} already exists!`});
        }

        const hashedPassword = await bcrypt.hash(data.password, 7);

        const user = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword,
        });

        await user.save();
        return res.json({message: "User has been created!"});
    } catch (e) {
        return res.status(400).json({message: "Server error: " + e});
    }
});

router.post("/login", async (req, res) => {
    try {
        const data = req.body;

        const user = await User.findOne({email: data.email});
        if (!user) {
            return res.status(404).json({message: `User with email: ${data.email} wasn't found`});
        } 

        const isPasswordValid = bcrypt.compareSync(data.password, user.password);
        if (isPasswordValid) {
            return res.status(404).json({message: "Password is unvalid!"});
        }

        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});
        return res.status(200).json({
            token,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        })
    } catch (e) {
        return res.status(400).json({message: "Server error: " + e});
    }
})

module.exports = router;