const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const fs = require("fs");
const path = require("path");

const connectDb  = require("./config/db");
const cors = require("cors");
const {clerkMiddleware} = require("@clerk/express");

const PORT = Number(process.env.PORT || 3001);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const publicDir = path.join(process.cwd(), "public")

if (!PORT || Number.isNaN(PORT)) {
    console.error("Missing or invalid PORT environment variable. Set PORT in Render or use a default.");
    process.exit(1);
}

app.use(express.json());
app.use(clerkMiddleware);
app.use(cors({origin: FRONTEND_URL, credentials: true}));

app.get("/", (req,res)=>{
    res.send("Home");
})
app.get("/health", (req,res)=>{
    res.status(200).json({ok : true});
})

if (fs.existsSync(publicDir)){
    app.use(express.static(publicDir));
    app.get(/.*/, (req,res,next)=>{
        res.sendFile(path.join(publicDir, "index.html"), (err)=>next(err));
    })
}

const server = app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});

server.on("error", (error) => {
    console.error("Server listen error:", error);
    process.exit(1);
});

async function startServer() {
    try {
        await connectDb();
    } catch (error) {
        console.error("MongoDB startup failed:", error.message || error);
    }
}

startServer();

