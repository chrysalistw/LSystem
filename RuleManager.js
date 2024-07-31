import Word from "./Word.js"

export default class ruleManager{
    rules = new Picker()
    constructor(){

    }
    add(rule, p=1){
        this.rules.add(rule, p)
    }
    //select rule according context and probability set
    pick(){
        return this.rules.pick()
    }
    getSuccessor(params){
        return this.pick().getSuccessor(params)
    }
}
export class Rule{
    constructor(word, string){
        this.word = word
        this.string = string
    }
    addParamSetter(ps){
        this.paramSetter = ps
        return this
    }
    addAgeSetter(as){
        this.ageSetter = as
        return this
    }
    getSuccessor(params){
        let {parameters, age, context} = params
        var string = this.string.map(w=>new Word(w))
        if(this.paramSetter)
            this.paramSetter(parameters, string)
        if(this.ageSetter)
            this.ageSetter(age, string)
        return string
    }
}
/*
    parametric module rule definition:
    var rule = ([a, b, c])=>{
        if a+b > 5
            return [a+b, b-2, c/3]
        else
            return [a-b, b-2, c+2]
    }
    // like this...?
*/
export class Picker{
    content = []
    probabilities = []
    constructor(){}
    add(c, p){
        this.content.push(c)
        this.probabilities.push(p)
    }
    pick(){
        let r = Math.random()
        let cumul = 0
        for(let i in this.probabilities){
            cumul += this.probabilities[i]
            if(r<cumul)
                return this.content[i]
        }
        return undefined
    }
}