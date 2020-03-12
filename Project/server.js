var express = require("express");
var app = express(); 
var itemList = []; //store items 

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

///*********************** */
app.get('/', (req, res) =>{
   res.render('catalog.html');
});

app.get('/contact', (req, res) =>{
    res.send("This will be the contact page, people working over here!!");
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
  
    var item = req.body;
    item.id = itemList.length + 1; // consecutive id
    itemList.push(item);

   res.status(201);
   res.json(item);
});

app.get('/api/items', (req,res) => {
     res.json(itemList);
});

app.listen(8080, function(){
     console.log("Server running at http://localhost:8080");
     console.log("Press Ctrl+C to kill it");
});