import ContainerActivity from "./ContainerActivity";
import Activity from "./Activity";
import { ActivityError } from "../ActivityError";

export default class SequenceActivity<
    C = any,
    R = any
> extends ContainerActivity<C, R> {
    constructor(context: C, children: Activity[]) {
        super(context, children);
    }

    protected buildFunction(children?: Activity[]) {
        this.children = children || this.children;
        return (ctx?: C, preRes?: any) =>
            new Promise(async (resolve, reject) => {
                for (let i = 0; i < this.children.length; i++) {
                    const child = this.children[i];
                    try {
                        preRes = await child.run(
                            ctx,
                            preRes,
                        );
                    } catch (err: any) {
                        reject(new ActivityError(err && err.message, child));
                    }
                }
                resolve(preRes);
            });
    }
}
