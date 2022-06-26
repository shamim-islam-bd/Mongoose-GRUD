const express = require("express");
const mongoose = require("mongoose");
const toDoHandler = require('./routeHandler/toDoHandler')

const app = express();
app.use(express.json());


//Database connection with mongoose......
mongoose.connect('mongodb://localhost/todos')
   .then(()=> console.log("Connection Success"))
   .catch( err => console.log("Connection Success"))


//Application Route....
app.use('/todo', toDoHandler);


//Defalut Error handlng....
 function errHandling(err, req, res, next){
    if(res.headerSent){
        return next(err);
    }
    res.status(500).json({error: err});
 }

 app.listen(3000, () => {console.log("App listening At port 3000")});