import { getFunctionBody } from "../src/util/function"


const a = {
    code: async (a: any, b: any) => {
        console.log(a, b)
    }
}

async function fn(a: any, b: any) {
    console.log(a, b)
}


console.log(getFunctionBody(fn));