import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import auth_router from "./routes/auth.routes.js";

//Configure dotenv => enable values stored in .env file to be accessible
dotenv.config();

const app = express();

//Application level middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
});


//Router level middlewares
app.use('/api/auth', auth_router);