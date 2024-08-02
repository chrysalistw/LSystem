import LSystem from "./LSystem.js"
import Draw from "./Draw.js"

var ls = new LSystem()

ls.addWord("F", Draw.forward)
ls.addWord("A", Draw.empty)
ls.addWord("B", Draw.empty)
ls.addWord("X", Draw.empty)
ls.addWord("U", Draw.empty)
ls.addWord("%", Draw.empty)
ls.addWord("+", Draw.turnRight)
ls.addWord("-", Draw.turnLeft)
ls.addWord("[", Draw.startBranch)
ls.addWord("]", Draw.endBranch)

ls.setAxiom("A")

ls.addRule("A", "F[-XB][+XB]A".split("")).addParamSetter((params,str)=>{
    str[0].parameters = [1]
    str[3].parameters = [3]
    str[8].parameters = [3]
})
ls.addRule("B", "FB".split("")).addParamSetter((params,str)=>{
    str[0].parameters = [1]
})
ls.addRule("X", "X".split("")).addCondition((params)=>params[0]>0).addParamSetter((params,str)=>{
    str[0].parameters = [params[0]-1]
})
ls.addRule("X", "U%".split("")).addCondition((params)=>params[0]==0)
ls.addRule("U", "F".split("")).addParamSetter((params,str)=>{
    str[0].parameters = [0.3]
})

ls.addChecker("%", function checker(index, string){
    console.log(index, string)
    //remove % and shed a branch
})

export default ls