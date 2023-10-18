import PageChildActivity from "./PageChildActivity";

export default class ContentActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(): Function {
        return this.task = (..._args: any[]) => {
            return this.page?.content()
        }
    }
}