import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import auth_router from "./routes/auth.routes.js";
import { connectToDatabase } from "./config/db.config.js";
import { errorHandler } from "./middlewares/error.middlewares.js";
import profile_router from "./routes/profile.routes.js";
import expense_router from "./routes/expense.routes.js";
import budget_router from "./routes/budget.routes.js";

//Configure dotenv => enable values stored in .env file to be accessible
dotenv.config();

const app = express();

//Application level middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:5173/', 
    methods: ['GET', 'POST', 'PATCH'],      
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

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

//Error level middleware
app.use(errorHandler);


//Router level middlewares
app.use('/api/auth', auth_router);
app.use('/api/profile', profile_router);
app.use('/api/expense', expense_router);
app.use('/api/budget', budget_router);