const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const corsMiddleware = require("./middleware/cors.middleware.js");
const authRouter = require("./routes/auth.routes.js");
const PORT = config.get("serverPort");

app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use(express.static("public"));

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"));

        app.listen(PORT, () => {
            console.log(`Server has been started on PORT:${PORT}`);
        })
    } catch (e) {
    
    }
}

start();