import { createFunctionWithExtraParams } from "../../src/factory/function";


const m = {
    properties: {
        aaa(num1: number, num2: number) {
            return num1 + num2;
        }
    }
};

const fn = createFunctionWithExtraParams('return $m.aaa(num1, num2)', "num1", "num2")(undefined, m);

console.log(fn(10, 20));