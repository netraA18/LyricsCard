document.addEventListener('DOMContentLoaded', function () {
    var canvas = new fabric.Canvas('canvas');

    displayText(canvas, 'Song Name', 'black', 110, 25, 25);
    displayText(canvas, 'Artist', 'black', 120, 57, 15);
    displayText(canvas, 'lyrics', 'black', 30, 100, 20);

    colorText(canvas);
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
        

    }
}







