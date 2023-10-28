import { TerminateError } from "../ActivityError";
import { IActivityExecuteParams } from "../types/activity";
import Activity from "./Activity";
import SequenceActivity from "./Sequence";

export default class TryCatchActivity<C = any, R = any> extends SequenceActivity<C, R>  {

    public catch: Activity | null = null;

    buildTask() {
        // 构建执行函数
        return async (paramObj: IActivityExecuteParams) => {
            try {
                const superTask = super.buildTask();
                const res = await superTask.call(this, paramObj);
                return res;
            } catch (err: any) {
                // 如果已经终止，不能catch TerminateError
                if (this.globalBuiltInCtx.terminated) {
                    if (err instanceof TerminateError) {
                        return err;
                    }
                    throw new TerminateError(this.globalBuiltInCtx.terminatedMessage || (err && err.message) || '未知异常', this)
                }
                await this.catch!.run(paramObj)
            }
        }
    }
}
