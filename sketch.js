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
    reset_button.position(x - reset_button.width/1.95 + 2, y);
    predict_button.position(x + reset_button.width/1.95 + 1, y)
}

// Stop scrolling on mobile devices when touching
function stopTouchScrolling(canvas){
    // Prevent scrolling when touching the canvas
    document.body.addEventListener("touchstart", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, { passive: false });
    document.body.addEventListener("touchend", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, { passive: false });
    document.body.addEventListener("touchmove", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, { passive: false });
    
}

// Setup the canvas
function setup() {
    // Create a 400px by 400px blank canvas and center align it
    canvas = createCanvas(400, 400).id("drawingCanvas");
    stopTouchScrolling(document.getElementById('drawingCanvas'));
    centerCanvas();
    background(255, 255, 255);
    frameRate(60);

    // Create reset and predict buttons and align them to the canvas
    reset_button = createButton("Reset");
    reset_button.id("controls");
    reset_button.size(200);
    predict_button = createButton("Save");
    predict_button.id("controls");
    predict_button.size(200);
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
    // First, convert to a base64 string and print it to the console
    let imageBase64String = canvas.elt.toDataURL();
    console.log(imageBase64String);
}

// Draw black circles if the mouse is pressed
function draw() {
    strokeWeight(20);
    if(mouseIsPressed) {
        fill(0);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}