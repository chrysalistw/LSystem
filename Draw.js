var surface = null
var isFirstVertex = true
export default {
    empty: function(){
        // empty function
    },
    forward: function(ctx, param, age){
        var LENGTH = param[0]*5
        LENGTH *= age?1/(1+Math.exp(-age)):1
        ctx.beginPath()
        //ctx.strokeStyle = rgbToHex([0, 220-Math.floor(220*age/2.0), Math.floor(255*age/2.0)])
        //ctx.lineWidth = age*7
        ctx.moveTo(0, 0)
        ctx.lineTo(LENGTH, 0)
        ctx.translate(LENGTH, 0)
        ctx.stroke()
    },

    turnRight: function(ctx,param){
        var ANGLE = param[0] || Math.PI/3
        ctx.rotate(-ANGLE)
    },
    turnLeft: function(ctx,param){
        var ANGLE = param[0] || Math.PI/3
        ctx.rotate(ANGLE)
    },

    startBranch: function(ctx){
        ctx.save()
    },
    endBranch: function(ctx){
        ctx.restore()
    },
    startLeaf: function(ctx){
        surface = new Path2D()
    },
    endLeaf: function(ctx){
        var transform = ctx.getTransform()
        ctx.resetTransform()
        ctx.fillStyle = "green"
        ctx.globalAlpha = 0.8
        ctx.fill(surface)
        ctx.stroke(surface)
        surface = null
        ctx.setTransform(transform)
    },
    markVertex: function(ctx){
        let matrix = ctx.getTransform()
        var pos = new DOMPoint(0, 0).matrixTransform(matrix);
        if(isFirstVertex){
            surface.moveTo(pos.x, pos.y)
            isFirstVertex = false
        }
        else
            surface.lineTo(pos.x, pos.y)
}
}
function hexToRgb(hex) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');
  
    // Parse the r, g, b values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
  
    return [r, g, b];
}
function rgbToHex(rgb) {
    let r = rgb[0].toString(16).padStart(2, "0")
    let g = rgb[1].toString(16).padStart(2, "0")
    let b = rgb[2].toString(16).padStart(2, "0")
  
    return "#"+r+g+b
}
