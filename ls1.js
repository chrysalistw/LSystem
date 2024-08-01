import LSystem from "./LSystem.js"
import Draw from "./Draw.js"

var l = new LSystem()

l.addWord("F", Draw.forward)
l.addWord("A", Draw.empty)
l.addWord("+", Draw.turnRight)
l.addWord("-", Draw.turnLeft)
l.addWord("[", Draw.startBranch)
l.addWord("]", Draw.endBranch)

var R = 1.456
// pack params and age and context together
// write "default rule" (identity transform)
// F(t; l) -> F(t+0.1; l)
l.addRule("F", ["F"]).addParamSetter((params, string)=>{
    string[0].parameters = params
}).addAgeSetter((age, string)=>{
    string[0].age = age+0.1
})
// +(theta): theta < 85 degrees -> +(theta + 5 degrees)
l.addRule("+", ["+"]).addParamSetter((params, string)=>{
    var a = params[0]+5/180*Math.PI
    if(a>Math.PI/2) a = Math.PI/2
    string[0].parameters = [a]
})
// -(theta): theta < 85 degrees -> -(theta + 5 degrees)
l.addRule("-", ["-"]).addParamSetter((params, string)=>{
    var a = params[0]+5/180*Math.PI
    if(a>Math.PI/2) a = Math.PI/2
    string[0].parameters = [a]
})
// A(t; l) -> F(t+0.1; l)[+(t; 5degrees)A(t; l/1.456)][-(t; 5degrees)A(t; l/1.456)]
l.addRule("A", "F[+A][-A]".split("")).addParamSetter((params, string)=>{
    var s = params[0]
    string[0].parameters = [s]
    string[2].parameters = [5/180*Math.PI]
    string[3].parameters = [s/R]
    string[6].parameters = [5/180*Math.PI]
    string[7].parameters = [s/R]
}).addAgeSetter((age, string)=>{
    string[0].age = age+0.1
    string[3].age = age
    string[7].age = age
})
/*
l.addRule("F", "F(5)F(5)", 0.95)
l.addRule("F", "F(5)", 0.05)
l.addRule("X", "F[+X]F[-X]+X".split("").map(m=>m+"()"), 0.7/2)
l.addRule("X", "F[-X]F[+X]-X".split("").map(m=>m+"()"), 0.7/2)
l.addRule("X", "F[+X][-X]FX".split(""), 0.2)
l.addRule("X", "F-[[X]+X]+F[+FX]-X".split(""), 0.1)
*/
export default l