import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "./.env" });


function connectDatabse() {
    mongoose.connect(process.env.DB_URL!).then(
        () => { console.log("connected succesfully") }
    ).catch(err => {
        console.log(process.env.DB_URL);
        console.log("error connecting to database");
        console.log(err);
    });   
}

export {connectDatabse};