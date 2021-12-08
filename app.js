var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:isaproj2021@cluster0.ckhcy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})
var app=express()

app.use(bodyParser.json());
app.use(express.static('views'));
app.use(bodyParser.urlencoded({
   extended: true
}));

app.post('/sign_up', function(req,res){
   var email =req.body.email;
   var pass = req.body.password;

   var data = {
      "email":email,
      "password":pass,
   }
   db.collection('details').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Account Login Successful");
   });
   return res.redirect('otp1.html');
})

app.get('/',function(req,res){
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(3000)

console.log("server listening at port 3000");