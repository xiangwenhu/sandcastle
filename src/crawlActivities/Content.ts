import PageChildActivity from "./PageChildActivity";

export default class ContentActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(): Function {
        return (..._args: any[]) => {
            return this.page?.content()
        }
    }
}