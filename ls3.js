import LSystem from "./LSystem.js"
import Draw from "./Draw.js"

var ls = new LSystem()

ls.addWord("a", Draw.empty)
ls.addWord("b", Draw.empty)

ls.addRule("a", ["b"]).addContextMatcher(function(i){
    //console.log(i, this.string[i-1])
    return this.string[i-1]?.name=="b"
}.bind(ls))
ls.addRule("b", ["a"])

ls.setAxiom("baaaaaaaaaaaaaa")

export default ls