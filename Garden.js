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
        })
    }
    draw(ctx){
        this.lsystems.forEach(ls=>{
            ls.draw(ctx)
        })
    }
}