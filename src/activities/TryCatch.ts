import { TerminateError } from "../ActivityError";
import { GK_TERMINATED, GK_TERMINATED_MESSAGE, IActivityExecuteParams } from "../types/activity";
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
            } catch (err) {
                // 如果已经终止，不能catch TerminateError
                if (this.globalCtx[GK_TERMINATED]) {
                    if (err instanceof TerminateError) {
                        return err;
                    }
                    throw new TerminateError(this.globalCtx[GK_TERMINATED_MESSAGE]!, this)
                }
                await this.catch!.run(paramObj)
            }
        }
    }
}
