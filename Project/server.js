var express = require("express");
var app = express(); 


app.get('/', (req, res) =>{
   console.log("Someone wants the root page");
   res.send("Hello my friend!");
});

app.get('/contact', (req, res) =>{
    res.send("This will be the contact page, people working over here!!");
});

app.get('/aboutme', (req, res) => {
     res.send("<h1 style='color:red;'> Ivonne Ocampo </h1>");
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
   
   res.status(202);
   res.send(vowels);
});

app.listen(8080, function(){
     console.log("Server running at http://localhost:8080");
     console.log("Press Ctrl+C to kill it");
});