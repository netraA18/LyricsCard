

document.addEventListener('DOMContentLoaded', function () {
    var canvas = new fabric.Canvas('canvas');

    var text = new fabric.IText('Hello!', {
        fill: 'green',
        editable: true
    });

    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 20,
        height: 10,
        fill: 'red'
        
    });

    canvas.add(text);
    //fetchText(canvas, text);
    // canvas.add(text);

});

// function fetchText(canvas, text) {
//     canvas.add(text);
//     console.log("Text: " + text.text);
//     document.getElementById("testText").innerText = text.text;
//     var htmlText = document.getElementById("testText").innerText;
//     console.log("HTML TEXT: " + htmlText);
//     // return text.text;
// }
