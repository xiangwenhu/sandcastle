import Activity from "../Activity";

export default class DeleteVariableActivity<C = any> extends Activity<C, any> {
    buildTask(name: string) {
        return (ctx: any = {}, preRes: any = undefined, extra: any = {}) => {
            const rName = this.replaceVariable(name, ctx, preRes, extra) as string;            
            delete this.globalVariables[rName];
        }
    }
}


