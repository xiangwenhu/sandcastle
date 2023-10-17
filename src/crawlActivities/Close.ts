import PageChildActivity from "./PageChildActivity";

export default class CloseActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    protected buildTask(): Function {
        return (..._args: any[]) => {
            return this.page?.close()
        }
    }
}