import LSystem from "./LSystem.js"
import Garden from "./Garden.js"

var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")

var STEP = 25
var LENGTH = 20/STEP
var ANGLE = 90/180*Math.PI
var l = new LSystem()

var forward = function(ctx, param, age){
    var LENGTH = param[0]
    LENGTH *= 1/(1+Math.exp(-age))
    ctx.beginPath()
    ctx.strokeStyle = rgbToHex([0, 220-Math.floor(220*age/2.0), Math.floor(255*age/2.0)])
    ctx.lineWidth = age*7
    ctx.moveTo(0, 0)
    ctx.lineTo(LENGTH, 0)
    ctx.translate(LENGTH, 0)
    ctx.stroke()
}

l.addWord("F", forward)
l.addWord("A")
l.addWord("+", (ctx,param)=>{
    var ANGLE = param[0]
    ctx.rotate(-ANGLE)
})
l.addWord("-", (ctx,param)=>{
    var ANGLE = param[0]
    ctx.rotate(+ANGLE)
})
l.addWord("[", ctx=>{
    ctx.save()
    // write a color string modifier
    let now = hexToRgb(ctx.strokeStyle)
    if((now[1]+=50)>255) 
        now[1] = 255
    if((now[0]+=15)>255) 
        now[0] = 255
    if((now[2]+=0)>255) 
        now[2] = 255
    //ctx.strokeStyle = rgbToHex(now)
})
l.addWord("]", ctx=>{
    ctx.restore()
})

var R = 1.456
l.addRule("F", ["F"]).addParamSetter((params, string)=>{
    string[0].parameters = params
}).addAgeSetter((age, string)=>{
    string[0].age = age+0.1
})
l.addRule("+", ["+"]).addParamSetter((params, string)=>{
    var a = params[0]+5/180*Math.PI
    if(a>Math.PI/2) a = Math.PI/2
    string[0].parameters = [a]
})
l.addRule("-", ["-"]).addParamSetter((params, string)=>{
    var a = params[0]+5/180*Math.PI
    if(a>Math.PI/2) a = Math.PI/2
    string[0].parameters = [a]
})
l.addRule("A", "F[+A][-A]".split("")).addParamSetter((params, string)=>{
    var s = params[0]
    string[0].parameters = [s]
    string[2].parameters = [5/180*Math.PI]
    string[3].parameters = [s/R]
    string[6].parameters = [5/180*Math.PI]
    string[7].parameters = [s/R]
    //return [s, 0, 0, s/R, 0, 0, 0, s/R, 0]
}).addAgeSetter((age, string)=>{
    string[0].age = age+0.1
    string[1].age = age
    string[2].age = age
    string[3].age = age
    string[4].age = age
    string[5].age = age
    string[6].age = age
    string[7].age = age
    string[8].age = age
})
/*
l.addRule("F", "F(5)F(5)", 0.95)
l.addRule("F", "F(5)", 0.05)
l.addRule("X", "F[+X]F[-X]+X".split("").map(m=>m+"()"), 0.7/2)
l.addRule("X", "F[-X]F[+X]-X".split("").map(m=>m+"()"), 0.7/2)
l.addRule("X", "F[+X][-X]FX".split(""), 0.2)
l.addRule("X", "F-[[X]+X]+F[+FX]-X".split(""), 0.1)
*/

ctx.fillStyle = "white"
ctx.fillRect(0, 0, 1400, 1000)
for(let i=0; i<=1400; i+=100){
    i = 700
    l.setOrigin(i, 950)
    l.setAxiom("A", [350], [0])

    for(let i=0; i<STEP; i++){
        l.step()
        //console.log(`length: ${l.string.length}`)
        //l.show()
        //ctx.fillStyle = "#FFF"
        //ctx.fillRect(0, 0, canvas.width, canvas.height)
        //l.draw(ctx)
        //downloadCanvasAsPng(canvas, "07231138-"+i.toString().padStart(2, "0"))
    }
    l.draw(ctx)
    break
}
window.step = function(){
    ctx.fillStyle = "#FFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    l.step()
    l.draw(ctx)
    //downloadCanvasAsPng(canvas, "07230338")
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
function hexToRgb(hex) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');
  
    // Parse the r, g, b values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
  
    return [r, g, b];
}
function rgbToHex(rgb) {
    let r = rgb[0].toString(16).padStart(2, "0")
    let g = rgb[1].toString(16).padStart(2, "0")
    let b = rgb[2].toString(16).padStart(2, "0")
  
    return "#"+r+g+b
}