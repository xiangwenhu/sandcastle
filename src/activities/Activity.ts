import { EnumActivityStatus } from "../enum";

class Activity<C = any> {
    public root: Activity | null;
    /**
     * 父节点
     */
    public parent: Activity | null;
    /**
     * name
     */
    public name: string | null;
    /**
     * 类型
     */
    public type: string | null;
    /**
     * 状态
     */
    public status: EnumActivityStatus = EnumActivityStatus.UNINITIALIZED;

    public globalContext: any;

    constructor(public context: C) {
        this.parent = null;
        this.name = null;
        this.type = this.constructor.name || "Activity";
        this.root = null;
    }

    run() {
        throw new Error("not implemented")
    }

    build() {
        throw new Error("not implemented");
    }

}


export default Activity;
