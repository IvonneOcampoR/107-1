var express = require("express");
var app = express(); 
var itemList = []; //store items 
var ItemDB;
var MessageDB;

// enable CORS
app.use(function(req, res, next) {res.header("Access-Control-Allow-Origin", "*");res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");res.header("Access-Control-Allow-Headers", "Origin, X-Rquested-With, Content-Type, Accept");next();
});

// config body- parse

var bparser = require("body-parser");
app.use(bparser.json());


//****************************** */

app.use(express.static(__dirname + '/public'))

var ejs= require('ejs');
app.set('views', __dirname + '/public');
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);


var mongoose = require('mongoose');
mongoose.connect("mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");

var db = mongoose.connection;
///*********************** */
app.get('/', (req, res) =>{
   res.render('catalog.html');
});

app.get('/contact', (req, res) =>{
    res.render("Contact.html");
});

app.get('/aboutme', (req, res) => {
     res.render('about.html');
});


app.get('/exc/:message', (req, res) => {
   console.log("Message from client: ", req.params.message);
   
   var msj = req.params.message;
   var vowels = '';
   var allVowels = ['a','e','i','o','u'];

   for(var i=0; i < msj.length; i++){
        var letter = msj[i];
        console.log(letter);
        
        if(allVowels.indexOf(letter.toLowerCase()) != -1){
             vowels += letter;
        }
   }
   
   res.status(201);
   res.send(vowels);
});

app.post('/api/items', (req, res) => {
   console.log("clients wants to store items");
  
    var itemForMongo = ItemDB(req.body);
    itemForMongo.save(
         function(error, savedItem){
           if(error){
                 console.log("**Error saving item", error);
                 res.status(500);
                 res.send(error);
           }

             console.log("Item Saved!!!");
             res.status(201);
             res.json(savedItem);
         }
    );

   
});



app.post('/api/message', (req, res) => {
  var messageForMongo = MessageDB(req.body);
  
    messageForMongo.save(
         function(error, savedMessage){
           if(error){
                 console.log("Error saving", error);
                 res.status(500);
                 res.send(error);
           }

             console.log("Mesage Saved!!!");
             res.status(201);
             res.json(savedMessage);
         });
});

app.get('/api/message', (req,res) => {
     MessageDB.find({}, function(error, data){
          if(error){
               res.status(500);
               res.send(error);
          }

          res.status(200);
          res.json(data);
     });
});


app.get('/api/items', (req,res) => {
     ItemDB.find({}, function(error, data){
          if(error){
               res.status(500);
               res.send(error);
          }

          res.status(200);
          res.json(data);
     });
});


app.get('/api/items/:id', (req, res) => {
     var id = req.params.id;

     ItemDB.find({_id: id}, function (error,item){
          if(error){
               res.status(404);
               res,send(error);
          }

          res.status(200);
          res.json(item);
     });
}); 

app.get('/api/items/byName/:name', (req,res) => {
     var name = req.params.name; 
     ItemDB.find({ user: name }, function(error, data){
          if(error){
               res.status(404);
               res.send(error);
          }

          res.status(200);
          res.json(data);
     });
});

app.delete('/api/items', (req, res) => {
     var item = req.body;

     ItemDB.finByIdAndRemove(item._id, function(error){
          if(error){
               res.status(500);
               res.sed(error);
          }

          res.status(200);
          res.send("Item removed!");
     });
});

// START SERVER

db.on('open',function (){
     console.log("Yeii!! DB connection secceed");   

      
      var itemsSchema = mongoose.Schema({
           code: String,
           description: String,
           price: Number,
           image: String,
           category: String,
           stock: Number,
           deliveryDays: Number,
           user: String
      });

      var messageSchema = mongoose.Schema({
           name: String,
           message: String,
      });


      ItemDB = mongoose.model("itemsCh6", itemsSchema);
       
      MessageDB = mongoose.model("messageCh6", messageSchema);
    

});



db.on('error',function(){
     console.log("Error connection to DB");  
});

app.listen(8080, function(){
     console.log("Server running at http://localhost:8080");
     console.log("Press Ctrl+C to kill it");
});