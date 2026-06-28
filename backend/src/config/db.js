const mongoose = require("mongoose");

async function connectDb() {
    try{
        const mongodbUri = process.env.MONGO_URI;

        if(!mongodbUri){
            throw new Error("MongoDB URI isnt present...");
        }

        const conn = await mongoose.connect(mongodbUri);

        console.log("MongoDB Connected!!!");
    }
    catch(e){
        console.error("MongoDB Connection failed!", e.message);
        process.exit(1);
    }
}

module.exports = connectDb;