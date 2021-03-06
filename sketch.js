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
    stopTouchScrolling(document.getElementById("drawingCanvas"));
    centerCanvas();
    background(255, 255, 255);
    frameRate(60);

    // Create reset and predict buttons and align them to the canvas
    reset_button = createButton("Reset");
    reset_button.id("controls");
    reset_button.size(200);
    predict_button = createButton("Predict");
    predict_button.id("controls");
    predict_button.size(200);
    alignButtons();

    reset_button.mousePressed(resetCanvas);
    predict_button.mousePressed(predictImage);
}

// Reset the canvas
function resetCanvas() {
    canvas = createCanvas(400, 400);
    centerCanvas();
    background(255, 255, 255);
    frameRate(60);
    document.getElementById("prediction").innerHTML = "I think this is a:"
}

// Get the prediction returned by the server
async function getPrediction(dataURL) {
    // Send and await a response
    let response = await fetch("http://129.151.91.21:5000/predict?Base64String=".concat(encodeURIComponent(dataURL)));
    let text = await response.text();

    // Log to console
    console.log(text);

    // Display on the screen
    document.getElementById("prediction").innerHTML = "I think this is a: ".concat(String(text))
}


// Save the image so we can predict information about it later
function predictImage() {
    // Create a blank graphi
    let resized = createGraphics(28, 28);

    // Draw and scale the canvas content 
    resized.image(canvas, 0, 0, 28, 28);
    resized.loadPixels();

    // Display the output in the top left corner
    //image(resized, 0, 0);

    // Send a GET request
    getPrediction(String(resized.elt.toDataURL()));
}

// Draw black circles if the mouse is pressed
function draw() {
    strokeWeight(50);
    if(mouseIsPressed) {
        fill(0);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}