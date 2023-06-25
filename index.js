require("dotenv").config();
const express = require("express");

const app = express();

const db = require("./config/ConnectDB");
const userRoute = require("./routes/User.routes");
const authRoute = require("./routes/userAuth.routes");
    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.use("/api/v1/user",userRoute);
app.use("/api/v1/auth",authRoute);
app.listen(port, () => console.log(`Server Listening on port:- ${port}`));