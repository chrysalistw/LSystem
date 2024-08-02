import LSystem from "./LSystem.js"
import Draw from "./Draw.js"

var l = new LSystem()

l.addWord("F", Draw.forward)
l.addWord("A", Draw.empty)
l.addWord("B", Draw.empty)
l.addWord("X", Draw.empty)
l.addWord("U", Draw.empty)
l.addWord("%", Draw.empty)
l.addWord("+", Draw.turnRight)
l.addWord("-", Draw.turnLeft)
l.addWord("[", Draw.startBranch)
l.addWord("]", Draw.endBranch)

l.addRule("A", "F[-XB][+XB]A".split("")).addParamSetter((params,str)=>{
    str[0].parameters = [1]
    str[4].parameters = [3]
    str[9].parameters = [3]
})
l.addRule("B", "FB".split("")).addParamSetter((params,str)=>{
    str[0].parameters = [1]
})
l.addRule("X", "X".split("")).addCondition((params)=>params[0]>0).addParamSetter((params,str)=>{
    str[0].parameters = [params[0]-1]
})
l.addRule("X", "U%".split("")).addCondition((params)=>params[0]==0)
l.addRule("U", "F".split("")).addParamSetter((params,str)=>{
    str[0].parameters = [0.3]
})


export default l