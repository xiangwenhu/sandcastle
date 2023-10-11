import { ActivityError, TerminateError } from "../ActivityError";
import { GK_TERMINATED, GK_TERMINATED_MESSAGE } from "../types/activity";
import Activity from "./Activity";
import SequenceActivity from "./Sequence";

export default class TryCatchActivity<C = any, R = any> extends SequenceActivity<C, R>  {

    public catch: Activity | null = null;

    constructor(context: C, children: Activity[]) {
        super(context, children)
    }

    // @ts-ignore
    async run(ctx?: any, preRes?: any, ...otherParams: any[]) {
        try {
            const res = await super.run(ctx, preRes, ...otherParams);
            return res;
        } catch (err) {
            // 如果已经终止，不能catch TerminateError
            if (this.globalCtx[GK_TERMINATED]) {
                if (err instanceof TerminateError) {
                    return err;
                }
                throw new TerminateError(this.globalCtx[GK_TERMINATED_MESSAGE]!, this)
            }
            await this.catch!.run(ctx, preRes, ...otherParams)
        }
    }
}
