import Garden from "./Garden.js"
import ls from "./ls2.js"

var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")

var garden = new Garden()

ls.setOrigin(700, 950)

garden.add(ls)

ctx.fillStyle = "white"
ctx.fillRect(0, 0, 1400, 1000)

var STEP = 7
for(let i=0; i<STEP; i++){
    garden.updateAll()
    //garden.draw(ctx)
    //downloadCanvasAsPng(canvas, `08020038-${i.toString().padStart(2,"0")}`)
}
garden.draw(ctx)

window.step = function(){
    garden.step()
}

function downloadCanvasAsPng(canvas, filename) {
    if (!canvas) {
        console.error('Canvas element not found.');
        return;
    }
    var dataURL = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
/*
[ ] context-sensitive
[*] stochastic
[*] parametric + condition
    - rule string designing.
[*] timed
[*] bracketed
[ ] 3d rendering?
*/