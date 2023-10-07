import { EnumActivityStatus } from "../enum";

class Activity<C = any> {
    /**
     * 父节点
     */
    public parent: Activity | null;
    /**
     * name
     */
    private name: string | null;
    /**
     * 类型
     */
    private type: string | null;
    /**
     * 状态
     */
    private status: EnumActivityStatus = EnumActivityStatus.UNINITIALIZED;

    constructor(public children: Activity[], public context: C) {
        this.parent = null;
        this.name = null;
        this.type  =  this.constructor.name || "Activity";
    }
}


export default Activity;
