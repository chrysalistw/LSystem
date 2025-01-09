import LSystem from "./LSystem.js"
import Draw from "./Draw.js"

var ls = new LSystem()

ls.addWord("A", Draw.empty)
ls.addWord("B", Draw.empty)
ls.addWord("C", Draw.empty)
ls.addWord("G", Draw.forward)
ls.addWord("+", Draw.turnLeft)
ls.addWord("-", Draw.turnRight)
ls.addWord("[", Draw.startBranch)
ls.addWord("]", Draw.endBranch)
ls.addWord("{", Draw.startLeaf)
ls.addWord("}", Draw.endLeaf)
ls.addWord(".", Draw.markVertex)

ls.addRule("A", "[+A{.].C.}".split(""))
ls.addRule("B", "[-B{.].C.}".split(""))
ls.addRule("C", ["G", "C"])

ls.setAxiom("[A][B]")

export default ls
