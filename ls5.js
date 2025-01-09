import LSystem from "./LSystem.js"
import Draw from "./Draw.js"

var ls = new LSystem()

ls.addWord("A", Draw.empty)
ls.addWord("B", Draw.empty)
ls.addWord("G", Draw.forward)
ls.addWord("+", Draw.turnLeft)
ls.addWord("-", Draw.turnRight)
ls.addWord("[", Draw.startBranch)
ls.addWord("]", Draw.endBranch)
ls.addWord("{", Draw.startLeaf)
ls.addWord("}", Draw.endLeaf)
ls.addWord(".", Draw.markVertex)

var param = {
    a: { LA: 5, RA: 1, LB: 1, RB: 1, PD: 0 },
    b: { LA: 5, RA: 1, LB: 1, RB: 1, PD: 1 },
    c: { LA: 5, RA: 1, LB: 0.6, RB: 1.06, PD: 1.25 },
    d: { LA: 5, RA: 1.2, LB: 10, RB: 1, PD: 0.5 },
    e: { LA: 5, RA: 1, LB: 1, RB: 1, PD: 1 },
    f: { LA: 5, RA: 1, LB: 1, RB: 1, PD: 1 }
}
var p = param.b
ls.addRule("A", "G[-B.][A][+B.]".split("")).addParamSetter((params,str)=>{
    var t = params[0]
    str[0].parameters = [p.LA, p.RA]
    str[3].parameters = [t]
    str[7].parameters = [t+1]
    str[11].parameters = [t]
})
ls.addRule("B", "GB".split("")).addParamSetter((params,str)=>{
    var t = params[0]
    str[0].parameters = [p.LB, p.RB]
    str[1].parameters = [t-p.PD]
}).addCondition((params)=>params[0]>0)
// the condition is not working !???
ls.addRule("G", ["G"]).addParamSetter((params,str)=>{
    var s = params[0]
    var r = params[1]
    str[0].parameters = [s*r, r]
})

ls.setAxiom("{.A}", [undefined, undefined, 0, undefined])

export default ls
