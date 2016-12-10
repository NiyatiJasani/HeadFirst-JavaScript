function bake(degrees) {
    var message;
    if (degrees > 500) {
        message = "I'm not a nuclear reactor";
    } else if (degrees < 100) {
        messsage = "I'm not a fridge";
    } else {
        message = "That's a very comfortable temperature for me";

        setMode("bake");
        setTemp(degrees);
    }
    return message;
}