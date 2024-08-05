import Word from "./Word.js"

export default class ruleManager{
    rules = new Picker()
    constructor(){

    }
    add(rule, p=1){
        this.rules.add(rule, p)
    }
    //select rule according context and probability set
    pick(params){
        //mix prob and conditions and contexts
        //match conditions and contexts here
        return this.rules.pick(params)
    }
    getSuccessor(params){
        //or here?
        return this.pick(params).getSuccessor(params)
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
    addEffect(ef){
        this.effect = ef
        return this
    }
    addCondition(cd){
        this.condition = cd
        return this
    }
    addContextMatcher(cf){
        this.contextMatcher = cf
        return this
    }
    getSuccessor(params){
        let {parameters, age, index} = params
        var string = this.string.map(w=>new Word(w))
        var matched
        if(this.contextMatcher){
            matched = this.contextMatcher()
            if(!matched) return
        }
        if(this.paramSetter)
            this.paramSetter(parameters, string)
        if(this.ageSetter)
            this.ageSetter(age, string)
        if(this.effect)
            this.effect(index)
        return string
    }
}
export class Picker{
    content = []
    probabilities = []
    constructor(){}
    add(c, p){
        this.content.push(c)
        this.probabilities.push(p)
    }
    pick(params){
        let probs = []
        let rules = this.content.filter((rule,i)=>{
            if(!rule.condition){
                probs.push(this.probabilities[i])
                return true
            }
            if(rule.condition(params.parameters)){
                probs.push(this.probabilities[i])
                return true
            }
            return false
        })
        let r = Math.random()
        let cumul = 0
        for(let i in probs){
            cumul += probs[i]
            if(r<cumul)
                return rules[i]
                //return this.content[i]
        }
        return undefined
    }
}