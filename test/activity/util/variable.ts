import { replaceVariable } from "../../../src/activities/util/variable"

const r = replaceVariable({
    words: "${ctx.name}, Good Morning, ${ctx.name}",
    words2: "{{ctx.name}}"
})({
    name: "Tom"
})
console.log(r)