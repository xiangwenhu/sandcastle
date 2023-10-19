import CodeActivity from "./Code";

export default class AssertActivity<C = any> extends CodeActivity<C, boolean> {

    async run(ctx?: any, preRes?: any, extra?: any): Promise<boolean> {
        const res = await super.run(ctx, preRes, extra);
        return !!res
    }
}


