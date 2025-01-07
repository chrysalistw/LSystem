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
ls.addWord("{", startLeaf)
ls.addWord("}", endLeaf)
ls.addWord(".", markVertex)

var surface
var isFirstVertex = true
function startLeaf(ctx){
    surface = new Path2D()
}
function endLeaf(ctx){
    var transform = ctx.getTransform()
    ctx.resetTransform()
    ctx.fillStyle = "green"
    ctx.fill(surface)
    console.log("applied a surface")
    surface = null
    ctx.setTransform(transform)
}
function markVertex(ctx){
    let invertedMatrix = ctx.getTransform().invertSelf()
    var pos = new DOMPoint(0, 0).matrixTransform(invertedMatrix);
    if(isFirstVertex){
        surface.moveTo(pos.x, pos.y)
        isFirstVertex = false
    }
    else
        surface.lineTo(pos.x, pos.y)
}

ls.addRule("A", "[+A{.].C.}".split(""))
ls.addRule("B", "[-B{.].C.}".split(""))
ls.addRule("C", ["G", "C"])

ls.setAxiom("[A][B]")

export default ls