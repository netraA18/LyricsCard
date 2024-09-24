var rgbV;
var outerCanvas;
var innerCanvas;
var lyricsStatus;


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
    setTextColor(innerCanvas);
    setFontSize(innerCanvas);   
});

WebFont.load({
    google: {
      families: ['Tangerine', 'Platypi', 'Pacifico', 'Briem Hand']
      
    },
        /**
         * Executes the setupFontStyles function with the innerCanvas as a parameter.
         *
         * @param {Object} innerCanvas - The canvas element on which the font styles will be set up.
         */
    active: function() {
        setupFontStyles(innerCanvas);
    }
  });
  
/**
 * Displays a rectangle on the specified canvas with the specified width, height, and fill color.
 * 
 * @param {Fabric.Canvas} canvasNumb - The canvas on which the rectangle is to be displayed.
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @param {string} fill - The fill color of the rectangle.
 */
function displayCard(canvasNumb, width, height, fill) {
    /**
     * Creates a new fabric.Rect object with the specified properties and adds it to the canvas.
     * @type {Fabric.Rect}
     */

    
    var cards = new fabric.Rect({
        fill: fill,       
        width: width,        
        height: height,        
        rx: 8,       
        ry: 8,
        stroke: 'gray', 
        strokeWidth: 1,
        
        
    })

    /**
     * Adds the newly created rectangle object to the canvas.
     */
    canvasNumb.add(cards);
}

function setTextColor(canvasNumb) {
    const textColorPicker = document.getElementById("textcolorpicker");
    textColorPicker.addEventListener("change", function(event) {
        const newTextColor = event.target.value;
        canvasNumb.getObjects('i-text').forEach(function (textItem) {
            textItem.set("fill", newTextColor);
        });

        canvasNumb.renderAll();

    })
}


function setFontSize(canvasNumb) {
    
    const textFontSize = document.getElementById("fontSizes");
    textFontSize.addEventListener("change", function(event){
        const newFontSize = event.target.value;
        canvasNumb.getObjects('i-text').forEach(function (textItem) {                    
            canvasNumb.getActiveObject().set("fontSize", newFontSize);
          
                
        });

        canvasNumb.renderAll();
    })
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

function blackBackground() {
    console.log("inside light");
    const newColors = 'black';
    const rectangles = outerCanvas.getObjects('rect');
    const selectedRect = rectangles[0];
    selectedRect.set("fill", newColors);
    outerCanvas.renderAll();
}

function randomBackground() {
    console.log("inside random background");
    const newColors = `rgb(${rgbV[1]}, ${rgbV[2]}, ${rgbV[0]})`;
    const rectangles = outerCanvas.getObjects('rect');
    const selectedRect = rectangles[0];
    selectedRect.set("fill", newColors);
    outerCanvas.renderAll();
}

function sameBackground() {
    const newColors = `rgb(${rgbV[0]}, ${rgbV[1]}, ${rgbV[2]}`;
    const rectangles = outerCanvas.getObjects('rect');
    const selectedRect = rectangles[0];
    selectedRect.set("fill", newColors);
    outerCanvas.renderAll();
}


/**
 * Converts a hex color string to an array of RGB values.
 * 
 * @param {string} hex - A hex color string in the format #RRGGBB
 * @return {Array<number>} - An array of three numbers representing the RGB values.
 * 
 * @example
 * const hex = '#FF0000';
 * const rgb = hexTorgb(hex);
 * // rgb is now [255, 0, 0]
 */
function hexTorgb(hex) {
    /**
     * The RGB values are generated by taking the first two characters of the hex string
     * and converting them to an integer using the bitwise OR operator. The bitwise
     * OR operator converts the hex characters to a binary number and combines them
     * with the value 0 (which is also a binary number). The result is a decimal
     * number representing the RGB value.
     */
    return [
        '0x' + hex[1] + hex[2] | 0,
        '0x' + hex[3] + hex[4] | 0,
        '0x' + hex[5] + hex[6] | 0
    ];
}


/**
 * Downloads an image of a Spotify card with customized content.
 *
 * @return {void} This function does not return anything.
 */
function download() {
    console.log("entered download");
    var cardCanvas = document.getElementById("outerCanvas");
  
    var innerCardCanvas = document.getElementById("innerCanvas");
    var cardImage = document.getElementById("myImg");
   
    var downloadCanvas = document.createElement('canvas');

    downloadCanvas.width = cardCanvas.width;
    downloadCanvas.height = cardCanvas.height;

    // Get the 2D drawing context of the download canvas
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
            /**
             * Sets an onload event handler for the img element and revokes the object URL
             * after the image has finished loading.
             *
             * @param {Event} event - The onload event object.
             * @return {void} This function does not return anything.
             */
            img.onload = () => {
                URL.revokeObjectURL(img.src);  
            }

            img.src = URL.createObjectURL(this.files[0]); 
        }
    })
})
