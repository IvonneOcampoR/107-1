var serverURL = "http://localhost:8080/api/";

function Message(name, message ){
    this.name = name;
    this.message = message;
    this.user = "Ivonne";
}

function clearForm(){
    $("#txtName").val("");
    $("#txtMessage").val("");
}

function saveMessage() {
    console.log("Saving");

    var name = $("#txtName").val();
    var message = $("#txtMessage").val();
    
    var theMessage = new Message(name, message);
   var jsonString = JSON.stringify(theMessage);
   


   $.ajax({
     url: serverURL + "message",
     type: "POST",
     data: jsonString,
     contentType: "application/json",
     success: function(response){
         console.log("Yeii, it works!", response);
     
         clearForm();

         $("#alertSuccess").removeClass("hidden");
         setTimeout(function(){
              $("#alertSuccess").addClass("hidden");
         }, 3000);
        
     },

     error: function(errorDetails){
         console.log("Error: ", errorDetails);
     }
   });


}



function init() {
    console.log("Tis is Contact page!!")


    $("#btnSaveMessage").click(saveMessage);
}

window.onload = init;
