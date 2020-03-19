var items = [];
var categories = [];
var serverURL = "http://localhost:8080/API/";

function fetchCatalog(){

   $.ajax({
     url: serverURL + "items",
     type: "GET",
     success: function(response){
        console.log("response", response);

        for (var i=0; i < response.length; i++){
           var item = response[i];
           if(item.user == "Ivonne"){
              items.push(item);
           }
        }

        displayCatalog();

     },
     error: function(errorDetails){
        console.log("Error:", errorDetails);
     }
     
   });
}

function displayCatalog(){
   
   for(var i=0; i < items.length; i++){
       var item = items[i];
       drawItem(item);

       var cat = item.category;

       if( !categories.includes(cat) ){
          categories.push(cat);
       }
   }
  
   drawCategories();
}

function drawItem(item){
    var sntx = 
    `<div class='item'> 
    <img src= '${item.image}'>
    <label class='code' >${item.code}</label> 
    <label class='cat' >${item.category}</label> 
    <label class='desc' >${item.description}</label> 
    <label class='price' >$ ${ (item.price * 1).toFixed(2)}</label>
    <button class='btn btn-sm btn-info'> + </button>
    </div>`;

    var container = $("#catalog");

    container.append(sntx);
}

function drawCategories(){
  var container = $("#categories");

  for (var i=0; i < categories.length; i++){
     var c = categories[i];

     var li = `<li class="list-group-item" > <a href = "#" onclick="searchByCategory('${c}');"> ${c}</a> </li>`;

     container.append(li);
  }

}

function search() {
   var text = $("#txtSearch").val().toLowerCase();
   
   $("#catalog").html("");

   for(var i=0; i< items.length; i++){
      var item = items[i];

      if (item.description.toLowerCase().includes(text)
        || item.category.toLowerCase().includes(text)
        || item.code == text
        || item.price == text
      )  {
         drawItem(item);
      }

   }
}

function searchByCategory(catName){
   console.log("Search by cat", catName);

   $("#catalog").html("");

   for (var i= 0; i < items.length; i++){
      var item = items[i];

      if ( item.category.toLowerCase() == catName.toLowerCase() ){
         drawItem(item);
      }
   }
}

function init() {
    console.log("This is catalog page!");


 fetchCatalog();
 


 $("#btnSearch").click(search);
 $("#txtSearch").keypress(function (e) {
 
    if (e.key == 13) {
       search();
    }
 });

   $("#catalog").on("click",".item", function(){
     // $(this).toogleeClass("selected");

      var img = $(this).find('img').clone();

     $("#modal-body").html(img);
     $("#modal").modal();
   });

}


window.onload = init;