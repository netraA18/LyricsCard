document.addEventListener('DOMContentLoaded', function () {
    var canvas = new fabric.Canvas('canvas');

    displayText(canvas, 'Song Name', 'black', 110, 25, 25);
    displayText(canvas, 'Artist', 'black', 120, 57, 15);
    displayText(canvas, 'lyrics', 'black', 30, 100, 20);


});

function displayText(canvas, text, color, leftPos, topPos, fontSize) {
    var textObject = new fabric.IText(text, {
        fill: color,
        editable: true,
        left: leftPos,
        fontStyle: 'bold',
        top: topPos,
        fontSize: fontSize
    })

    canvas.add(textObject);
}

