let rgbV;
var outerCanvas;
var innerCanvas;

document.addEventListener('DOMContentLoaded', function () {
    outerCanvas = new fabric.Canvas('outerCanvas');
    innerCanvas = new fabric.Canvas('innerCanvas');

    displayCard(outerCanvas, 400, 400, 'white');
    displayCard(innerCanvas, 295, 295, 'white');
    displayText(innerCanvas, 'Song Name', 'black', 110, 25, 25, 'bold');
    displayText(innerCanvas, 'Artist', 'black', 120, 57, 15, 'bold');
    displayText(innerCanvas, 'Enter lyrics here', 'black', 30, 100, 20, 'bold');
    displayText(innerCanvas, 'Spotify', 'black', 15, 270, 15, 'italic');
  
    setupSquareColor(innerCanvas);
    colorText(innerCanvas);
    fontSizeNew(innerCanvas);   
});

WebFont.load({
    google: {
      families: ['Tangerine', 'Platypi', 'Pacifico', 'Briem Hand']
      
    },
    active: function() {
        setupFontStyles(innerCanvas);
    }
  });
  
function displayCard(canvasNumb, width, height, fill) {
    var cards = new fabric.Rect({
        fill: fill,
        width: width,
        height: height,

        rx: 3,
        ry: 3,

    })

    canvasNumb.add(cards);
}


function colorText(canvasNumb) {

    const textColorPicker = document.getElementById("textcolorpicker");
    textColorPicker.addEventListener("change", function (event) {
        changeTextColor(canvasNumb, event.target.value);
    }, false);
}



function changeTextColor(canvasNumb, color) {
    canvasNumb.getObjects('i-text').forEach(function (textItem) {
        textItem.set("fill", color);
    });
    canvasNumb.renderAll();

}



function fontSizeNew(canvasNumb) {

    const textfontSize = document.getElementById("fontSizes");
    textfontSize.addEventListener("change", function (event) {
        changeFontSize(canvasNumb, event.target.value);
    }, false);



}

function changeFontSize(canvasNumb, fontSize) {
    canvasNumb.getObjects('i-text').forEach(function (textItem) {

        if (textItem.text === "lyrics") {
            textItem.set("fontSize", fontSize);
        }

    });
    canvasNumb.renderAll();

}

function displayText(canvasNumb, text, color, leftPos, topPos, fontSize, fontStyle) {
    var textObject = new fabric.IText(text, {
        fill: color,
        editable: true,
        left: leftPos,        
        top: topPos,
        fontSize: fontSize,
        fontStyle: fontStyle,    

    })

    // return textObject;
    canvasNumb.add(textObject);
}

function setupFontStyles(canvasNumb) {
    const fontStyles = document.getElementById("fontStyles");
    fontStyles.addEventListener("change", function (event) {
        const newFontStyle = event.target.value;
        
        canvasNumb.getObjects('i-text').forEach(function (textItem) {
                
            textItem.set("fontFamily", newFontStyle);
           
        })
        canvasNumb.renderAll();
    }, false);
   
}



function setupSquareColor(canvasNumb) {
    const colorPicker = document.querySelector('input[type=color]');
    colorPicker.addEventListener("change", function (event) {
        const color = event.target.value;
        rgbV = hexTorgb(color);
        const rectangles = canvasNumb.getObjects('rect');
        const blueRectangle = rectangles[0];
        blueRectangle.set("fill", color);
        canvasNumb.renderAll();

    }, false);

}


function lightBackground() {
    const newColors = `rgba(${rgbV[0]}, ${rgbV[1]}, ${rgbV[2]}, 0.5`;

    const rectangles = outerCanvas.getObjects('rect');


    const greenRect = rectangles[0];
    greenRect.set("fill", newColors);
    outerCanvas.renderAll();
}

function randomBackground() {

    const newColors = `rgba(${rgbV[1]}, ${rgbV[2]}, ${rgbV[0]}, 0.8`;
    const rectangles = outerCanvas.getObjects('rect');


    const greenRect = rectangles[0];
    greenRect.set("fill", newColors);
    outerCanvas.renderAll();
}

function sameBackground() {

    const newColors = `rgb(${rgbV[0]}, ${rgbV[1]}, ${rgbV[2]}`;
    const rectangles = outerCanvas.getObjects('rect');


    const greenRect = rectangles[0];
    greenRect.set("fill", newColors);
    outerCanvas.renderAll();
}


function hexTorgb(hex) {
    return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}

function download() {
    var cardCanvas = document.getElementById("outerCanvas");
    var innerCardCanvas = document.getElementById("innerCanvas");
    var cardImage = document.getElementById("myImg");
   
   

    var downloadCanvas = document.createElement('canvas');

    downloadCanvas.width = cardCanvas.width;
    downloadCanvas.height = cardCanvas.height;
    var ctx = downloadCanvas.getContext("2d");

    ctx.drawImage(cardCanvas, 0, 0);
    ctx.drawImage(innerCardCanvas, 100, 110);
    ctx.drawImage(cardImage, 145, 158, 125, 125);


    var dataUrl = downloadCanvas.toDataURL("image/jpeg");

    var link = document.createElement('a');
    link.download = 'spotifyCard.jpg';
    link.href = dataUrl;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

window.addEventListener('load', function () {
    this.document.querySelector('input[type="file"]').addEventListener('change', function () {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }

            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    })
})








