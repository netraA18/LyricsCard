let rgbV;

document.addEventListener('DOMContentLoaded', function () {
    var canvas = new fabric.Canvas('canvas');

    displayText(canvas, 'Song Name', 'black', 110, 25, 25);
    displayText(canvas, 'Artist', 'black', 120, 57, 15);
    displayText(canvas, 'lyrics', 'black', 30, 100, 20);

    colorText(canvas);
    fontSizeNew(canvas);
    
});


function colorText(canvas) {
    
    const textColorPicker = document.getElementById("textcolorpicker");
    textColorPicker.addEventListener("change", function(event) {
        changeTextColor(canvas, event.target.value);
    }, false);  
}



function changeTextColor(canvas, color) {
    canvas.getObjects('i-text').forEach(function(textItem) {
        textItem.set("fill", color);
    });
    canvas.renderAll();

}



function fontSizeNew(canvas) {
    
    const textfontSize = document.getElementById("fontSizes");
    textfontSize.addEventListener("change", function(event) {
        changeFontSize(canvas, event.target.value);
    }, false);

   
   
}

function changeFontSize(canvas, fontSize) {
    canvas.getObjects('i-text').forEach(function(textItem) {
        
        if (textItem.text === "lyrics") {
            textItem.set("fontSize", fontSize);
        }
       
    });
    canvas.renderAll();

}

function displayText(canvas, text, color, leftPos, topPos, fontSize) {
    var textObject = new fabric.IText(text, {
        fill: color,
        editable: true,
        left: leftPos,
        fontStyle: 'bold',
        top: topPos,
        fontSize: fontSize,
        
    })
    canvas.add(textObject);
}


window.onload = function () {
    const colorPicker = document.querySelector('input[type=color]');    
    colorPicker.addEventListener("change", changeColor, false);
   
    function changeColor(event) { 
            const card = document.querySelector(".ContentCard");
            card.style.backgroundColor = event.target.value;
            rgbV = hexTorgb(event.target.value);           

    }
}

function lightBackground() {
    const outerCard = document.querySelector(".SpotifyCard");
    const newColors = `rgba(${rgbV[0]}, ${rgbV[1]}, ${rgbV[2]}, 0.5`; 
    outerCard.style.backgroundColor = newColors;

}

function randomBackground() {
    const outerCard = document.querySelector(".SpotifyCard");
    const newColors = `rgba(${rgbV[1]}, ${rgbV[2]}, ${rgbV[0]}, 0.8`; 
    outerCard.style.backgroundColor = newColors;
}

function hexTorgb(hex) {
    return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}


window.addEventListener('load', function() {
   this.document.querySelector('input[type="file"]').addEventListener('change', function() {
    if (this.files && this.files[0]) {
        var img = document.querySelector('img');
        img.onload = () => {
            URL.revokeObjectURL(img.src);  // no longer needed, free memory
        }

        img.src = URL.createObjectURL(this.files[0]); // set src to blob url
    }
   })
})








