import PageChildActivity from "./PageChildActivity";

export default class HoverActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(selector: string): Function {
        return (..._args: any[]) => {
            return this.page?.hover(selector)
        }
    }
}