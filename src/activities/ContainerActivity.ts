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

    private adjust() {
        this.#children.forEach((child, index) => {
            child.pre = index === 0 ? null : this.children[index - 1];
            child.parent = this;
            child.globalCtx = this.globalCtx;
            child.next = index === this.#children.length - 2 ? null : this.children[index - 2];
        })
    }
}
