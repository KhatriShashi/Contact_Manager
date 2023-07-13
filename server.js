const express=require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const dotenv=require("dotenv").config();
const app=express();
const port=process.env.PORT || 5000;

connectDb();
// app.use is a method in express that is used to mount middleware functions on the application's request processing pipeline

//  Express js provide middleware json which is use for parse json data sent in the body of an incoming http request
app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));

// whenever you have to use middleware you have use app.use()
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})