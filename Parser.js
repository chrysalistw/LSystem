export default function parse(input){
    var tokens = tokenize(input)
    return parseExpression(tokens)
}

function tokenize(input) {
    const tokens = [];
    const tokenPattern = /\s*([a-zA-Z_\[\]\+\-]\w*|\d+|[(),])\s*/g;
    let match;
    function tokenPush(input){
        while (match = tokenPattern.exec(input)) {
            tokens.push(match[1]);
        }
    }

    if(Array.isArray(input)){
        input.forEach(i=>tokenPush(i))
    }
    else
        tokenPush(input)
    
    return tokens;
}
function parseExpression(tokens){
    let modules = []
    while(tokens.length>0){
        modules.push(parseModule(tokens))
    }
    return modules
}
function parseModule(tokens){
    let name = tokens.shift()
    let args = parseArgument(tokens)
    return {
        name, 
        arguments: args
    }
}
function parseArgument(tokens){
    if(tokens[0]!=="(")
        return []
    let args = []
    tokens.shift()
    while(tokens[0]!==")"){
        args.push(tokens.shift())
        if(tokens[0]==",")
            tokens.shift()
    }
    if(tokens[0]==")")
        tokens.shift()
    return args
}