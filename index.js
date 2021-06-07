const express =require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
require('dotenv').config();

//set up express app
const app=express();

//connect to mongoDB
mongoose.connect("mongodb+srv://prakhar1:mongodb1@cluster0.aloqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
mongoose.Promise=global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

//initialize
app.use('/api',require('./routes/api'));

//error handing middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error:err.message});

});

//listen to request
app.listen(process.env.port,function(){
console.log('now listening for requests');
});
