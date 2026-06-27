const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

console.log("Db url = ", process.env.DB_URL);

app.get("/", (req,res)=>{
    console.log("Homepage");
    res.send("Home");
})

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})