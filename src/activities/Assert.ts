import CodeActivity from "./Code";

export default class AssertActivity<C = any> extends CodeActivity<C, boolean> {

    async run(ctx?: any, preRes?: any, ...otherParams: any[]): Promise<boolean> {
        const res = await super.run(ctx, preRes, ...otherParams);
        return !!res
    }
}


