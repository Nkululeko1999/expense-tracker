import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import auth_router from "./routes/auth.routes.js";
import { connectToDatabase } from "./config/db.config.js";

//Configure dotenv => enable values stored in .env file to be accessible
dotenv.config();

const app = express();

//Application level middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT;


//Establish databse connection first before server
const connection = async () => {
    try {
        await connectToDatabase();
        
        app.listen(port, () => {
            console.log(`Server started running on port ${port}`);
        });
    } catch (err) {
        console.error("Failed to establish db connection first", err);
    }
}

//Invoke connection func
connection();


//Router level middlewares
app.use('/api/auth', auth_router);