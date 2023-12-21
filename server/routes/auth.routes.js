const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const authMiddleware = require("../middleware/auth.middleware.js");
const multer = require("multer");
const path = require("path");

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
            photo: "",
            password: hashedPassword,
        });

        await user.save();
        return res.json({message: "User has been created!"});
    } catch (e) {
        return res.status(400).json({message: "Server error: " + e});
    }
});

router.post("/login",
    async (req, res) => {
    try {
        const data = req.body;

        const user = await User.findOne({email: data.email});
        if (!user) {
            return res.status(404).json({message: `User with email: ${data.email} wasn't found`});
        } 

        const isPasswordValid = bcrypt.compareSync(data.password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({message: "Password is unvalid!"});
        }

        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});
        return res.status(200).json({
            token,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                logoPath: user.photo,
                email: user.email,
            }
        })
    } catch (e) {
        return res.status(400).json({message: "Server error: " + e});
    }
})
router.post("/auth", authMiddleware,
    async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id});

        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});

        return res.json({
            token,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                logoPath: user.photo,
                email: user.email,
            }
        });
    } catch (e) {
        return res.status(401).json({message: "Server error: " + e})
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/Images");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
})
router.post("/image-update", upload.single("file"), authMiddleware,
    async (req, res) => {
        try {
            console.log(req.file);

            const user = await User.findOneAndUpdate({_id: req.user.id}, {photo: req.file.filename}, {
                new: true,
                upsert: true,
                rawResult: true // Return the raw result from the MongoDB driver
            });

            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});

            return res.json({
                token,
                logoPath: user.photo,
            });
        } catch (e) {
            return res.json({message: "Server error: " + e})
        }
    })
module.exports = router;