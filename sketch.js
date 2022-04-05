var canvas;
var reset_button;
var predict_button;

// Center a canvas on the page
function centerCanvas() {
    var x = (windowWidth - width)/2;
    var y = (windowHeight - height)/2;
    canvas.position(x, y);
}

// Align buttons to the canvas
function alignButtons() {
    var x = (windowWidth - reset_button.width)/2;
    var y = (windowHeight + height)/2;
    reset_button.position(x - reset_button.width/1.5, y);
    predict_button.position(x + reset_button.width/1.5, y)
}

// Setup the canvas
function setup() {
    // Create a 400px by 400px blank canvas and center align it
    canvas = createCanvas(400, 400);
    centerCanvas();
    background(255, 255, 255);
    frameRate(60);

    // Create reset and predict buttons and align them to the canvas
    reset_button = createButton("Reset");
    predict_button = createButton("Predict");
    alignButtons();

    reset_button.mousePressed(resetCanvas);
    predict_button.mousePressed(saveImage);

}

// Reset the canvas
function resetCanvas() {
    canvas = createCanvas(400, 400);
    centerCanvas();
    background(255, 255, 255);
    frameRate(60);
}

// Save the image so we can predict information about it later
function saveImage() {

}

// Draw black circles if the mouse is pressed
function draw() {
    strokeWeight(10);
    if(mouseIsPressed) {
        fill(0);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}