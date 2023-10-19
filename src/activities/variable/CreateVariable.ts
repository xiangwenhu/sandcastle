import Activity from "../Activity";

export default class CreateVariableActivity<C = any> extends Activity<C, any> {
    buildTask(name: string, value: any) {
        return (ctx: any = {}, preRes: any = undefined, extra: any = {}) => {
            const rName = this.replaceVariable(name, ctx, preRes, extra) as string;
            const rValue = this.replaceVariable(value, ctx, preRes, extra);
            this.globalVariables[rName] = rValue;
        }
    }
}


