import { getFunctionBody } from "../../src/util/function";



function commonFun(...args: any[]) {
    return "function a(){}"
}

async function asyncFun(...args: any[]) {
    return "asyncFun"
}

const obj = {
    fun1() {
        return "obj fun1"
    },

    async asyncFun() {
        return "obj asyncFun"
    },

    arrowFun: () => {
        return "obj arrowFun "
    }
}


console.log(getFunctionBody(commonFun));
console.log(getFunctionBody(asyncFun));
console.log(getFunctionBody(obj.fun1));
console.log(getFunctionBody(obj.asyncFun));
console.log(getFunctionBody(obj.arrowFun));