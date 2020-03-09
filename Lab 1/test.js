
var mathLib =  require('./myMath');


function sayHello() {
    console.log("Hello, my name is Ivonne")
}


function exc1(){
    //print numbers from one to ten, no 7
    for(var i=1; i< 11; i++){
        if( i != 7){
            console.log(i);
        }
    }
}

function exc2(){
    //print numbers from 20 to 1, excep 7 and 13
    for(var i=20; i>0; i--){
        //if is not 7 and i is not 13
        if(i != 7 && i != 13){
            console.log(i);
        }
       
    }
}

console.log("Hello World");

sayHello();
exc1();
exc2();


mathLib.funMath();

var res = mathLib.sum(21, 21);
console.log("result:", res);

var bigger = mathLib.greater(8725383847, 324151242);
console.log("bigger:", bigger);

var smaller = mathLib.smaller(0, -1);
console.log("smaller", smaller);

var r1 = mathLib.division(67653,898);
console.log(r1);

var r2 = mathLib.division(5, 0);
console.log(r2);

var r4 = mathLib.isEven(74);
console.log(r4);

var r5 = mathLib.isEven(11);
console.log(r5);

//CMDEr