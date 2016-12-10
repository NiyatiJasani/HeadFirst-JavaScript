var products = ["Choo", "Icy mint", "Cake batter", "Bubblegum"];
var hasBubbleGum = [false, false, false, true];

var i = 0;

if (hasBubbleGum[i])
    while (i < hasBubbleGum.length) {
        console.log(products[i] + "conatins bubble gum");
        i = i + 1;
    }