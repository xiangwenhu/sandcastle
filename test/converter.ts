import { isFunction } from 'lodash';
import converter from '../src/util/converter';

const config = {
    type: "ccode",
    name: "如果ctx.count小于5,加加",
    before: {
        name: "",
        options: {
            code(param: any) {
                param.$$.ccc = 1000;
            }
        }
    },
    toVariable: "sb",
    context: {
        count: 100
    },
    options: {
        // code:    "console.log('$tt', $$.$tt, $$.ccc);",
        code(params: any) {
            console.log(params.$ctx.count)
        }
    },
};


const jsonObject = converter.toJSON(config as any);

console.log("jsonObject:", jsonObject);

const configObject = converter.toObject(jsonObject);

console.log("configObject:", configObject);