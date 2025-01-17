import RuleManager from "./RuleManager.js"

export default class Word{
    name
    parameters
    age
    draw
    constructor(name){
        this.name = name
    }
    get arguments(){
        return this.parameters
    }
    setDraw(d = ()=>{}){
        this.draw = d
        return this
    }
    setParameters(p){
        this.parameters = p
        return this
    }
    setAge(age){
        this.age = age
        return this
    }
}