import parser from "./Parser.js"
import Word from "./Word.js"
import {Rule, Picker} from "./RuleManager.js"
import RuleManager from "./RuleManager.js"

export default class LSystem{
    origin = {x:700, y:900}
    words = {}
    rules = {}
    string = []
    axiom = []
    constructor(){
    }
    setOrigin(x, y){
        this.origin = {x, y}
    }
    setAxiom(ax, p=[], a=[0]){
        this.axiom = ax
        this.string = [...ax].map((w,i)=>new Word(w).setParameters([p[i]]).setAge(a[i]))
    }
    addWord(name, draw){
        this.words[name] = new Word(name)
        this.words[name].setDraw(draw)
    }
    addRule(word, string, prob){
        let rule = new Rule(word, string)
        if(!this.rules[word])
            this.rules[word] = new RuleManager()
        this.rules[word].add(rule, prob)
        return rule
    }
    addChecker(ch){
        this.checker = ch
        return this
    }
    step(){
        var result = []
        var words = this.words
        var rules = this.rules
        this.string.forEach((w,i)=>{
            if(!rules[w.name]){
                result.push(w)
                return
            }
            var index = i // <------ 注目！
            // skip some specific structure?
            // context matcher
            // pack all parameters, age, context, parameters of contexts(?) together.
            let params = {
                parameters: w.parameters,
                age: w.age,
                index //build this context
                // how much context should I send?
            }
            let successor = rules[w.name].getSuccessor(params)
            result.push(...successor)
        })
        this.string = result
        console.log("before splice: ")
        this.show()
        this.checker(this.string)
        return result
    }
    show(){
        var str = ""
        this.string.forEach(w=>{
            str+=w.name
            //if(w.parameters)
            //    str+="("+w.parameters.join(",")+")"
            if(w.age)
                str+="("+w.age+")"
        })
        console.log(str)
        return str
    }
    draw(ctx){
        let words = this.words
        ctx.save()
        ctx.translate(this.origin.x, this.origin.y)
        ctx.rotate(-Math.PI/2)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        this.string.forEach(w=>{
            let parameters = w.parameters || []
            let age = w.age || undefined
            words[w.name]?.draw(ctx, parameters, age)
        })
        ctx.restore()
    }
}