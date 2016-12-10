//the argument is sent to the parametre r
function calculateArea(r) {
    var area;
    if (r <= 0) {
        return 0;
    } else {
        area = Math.PI * r * r;
        return area;
    }
}

var radius = 5.2;
//passing radius variable as an argument and is sent ot function calculatearea as an argument r with value 5.2
//the value is stored the variable theArea
var theArea = calculateArea(radius);
console.log("The area is: " + theArea)