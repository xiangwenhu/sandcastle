import Activity from "./Activity";

export default class ContainerActivity<C = any, R = any> extends Activity<C, R>{
    #children:  Activity[] = [];

    get children() {
        return this.#children;
    }

    set children(values: Activity[]) {
        this.#children = [...values];
        this.adjust();
    }

    constructor(context: C, children: Activity[]) {
        super(context);
        this.children = children;
    }

    protected adjust() {
        this.#children.forEach((child, index) => {
            child.pre = index === 0 ? undefined : this.children[index - 1];
            // 孩子节点的上下文等于父容器
            child.ctx = this.ctx;
            child.globalCtx = this.globalCtx;
            child.parent = this;
            child.next = index === this.#children.length - 2 ? undefined : this.children[index - 2];
        })
    }
}
