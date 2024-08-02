export default class Garden{
    // maintain multiple LSystem instances
    lsystems = []
    constructor(...a){
        this.lsystems = a
    }
    add(ls){
        this.lsystems.push(ls)
    }
    updateAll(){
        this.lsystems.forEach(ls=>{
            ls.step()
            ls.show()
        })
    }
    draw(ctx){
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        this.lsystems.forEach(ls=>{
            ls.draw(ctx)
        })
    }
}