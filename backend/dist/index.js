const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const fs = require("fs");
const path = require("path");

const connectDb  = require("./config/db");
const cors = require("cors");
const {clerkMiddleware} = require("@clerk/express");

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public")

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
    app.get("/{*any}", (req,res,next)=>{
        res.sendFile(path.join(publicDir, "index.html"), (err)=>next(err));
    })
}

app.listen(PORT, ()=>{
    connectDb();
    console.log(`Server running on http://localhost:${PORT}`);
})

