var serverURL = "http://localhost:8080/api/";

function Item(code, desc, price, image, category, stock, deliveryDays ){
    this.code = code;
    this.description = desc;
    this.price = price;
    this.image = image;
    this.category = category;
    this.stock = stock;
    this.deliveryDays = deliveryDays
    this.user = "Ivonne";
}

function clearForm(){
    $("#txtCode").val("");
    $("#txtDescription").val("");
    $("#txtPrice").val("");
    $("#txtImage").val("");
    $("#txtCategory").val("");
    $("#txtStock").val("");
    $("#txtDeliveryDays").val("");

}

function saveItem() {

    var code = $("#txtCode").val();
    var desc = $("#txtDescription").val();
    var price = $("#txtPrice").val();
    var image = $("#txtImage").val();
    var category = $("#txtCategory").val();
    var stock = $("#txtStock").val();
    var delivery = $("#txtDeliveryDays").val();


    var theItem = new Item(code, desc, price, image, category, stock, delivery );
   var jsonString = JSON.stringify(theItem);
   


   $.ajax({
     url: serverURL + "items",
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

function testAjax() {
    $.ajax({
      url: serverURL + "test",
      type: 'GET',
      success: function (res) {
           console.log("Server says", res);
      },
      error: function (err) {
          console.log("Error ocurred", err);
      }
    });
}


function init() {
    console.log("Tis is Admin page!!")


    $("#btnSave").click(saveItem);
}




window.onload = init;