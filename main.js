import LSystem from "./LSystem.js"
import Garden from "./Garden.js"
import Draw from "./Draw.js"

var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")

var STEP = 7
var LENGTH = 20/STEP
var ANGLE = 90/180*Math.PI
var l = new LSystem()

l.addWord("F", Draw.forward)
l.addWord("A", Draw.empty)
l.addWord("+", Draw.turnRight)
l.addWord("-", Draw.turnLeft)
l.addWord("[", Draw.startBranch)
l.addWord("]", Draw.endBranch)

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