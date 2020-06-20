const express = require('express');
const Dotenv = require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;
const auth = require ("./middleware/auth");

const router = require ("./router");
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());

app.use ("/api", router);


app.use((req,res,next)=>{
    var error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    error.status = (error.status || 500 );
    res.json({
        message:error.message
    });
});

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));
