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
    addWord(name, draw = ()=>{}){
        this.words[name] = new Word(name)
        this.words[name].draw = draw
    }
    addRule(word, string, prob){
        // parse the rule
        /*
        let moduleArray = parser(string)
        string = moduleArray.map(m=>{
            return new Word(m.name).setParameters(m.arguments)
        })
        */
        /*
        string = string.map(w=>{
            return this.words[w]
        })
        */
        let rule = new Rule(word, string)
        if(!this.rules[word])
            this.rules[word] = new RuleManager()
        this.rules[word].add(rule, prob)
        return rule
    }
    step(){
        var result = []
        var words = this.words
        var rules = this.rules
        this.string.forEach((w,i)=>{
            if(!rules[w.name]){
                //result.push(words[w.name])
                result.push(w)
                return
            }
            var indexOfWord = i // <------ 注目！
            let successor = rules[w.name].getSuccessor(w.parameters, w.age/*, w.context*/)
            result.push(...successor)
        })
        this.string = result
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
    async draw(ctx){
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
        //ctx.stroke()
        ctx.restore()
    }
}