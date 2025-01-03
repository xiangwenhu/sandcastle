import { ExtendParams } from "../types/activity";
import Activity from "./Activity";

export default class ContainerActivity<C = any, R = any, O = any> extends Activity<
    C,
    R,
    O
> {
    #children: Activity[] = [];

    get children() {
        return this.#children;
    }

    set children(values: Activity[]) {
        this.#children = [...values];
        this.adjust();
    }

    protected adjust() {
        this.#children.forEach((child, index) => {
            child.pre = index === 0 ? undefined : this.children[index - 1];
            // 使用父容器的ctx
            child.globalCtx = this.globalCtx;
            child.parent = this as any;
            child.next =
                index === this.#children.length - 2
                    ? undefined
                    : this.children[index - 2];
        });
    }

    childrenUseParentCtx(useParentCtx: boolean = true) {
        this.children.forEach((c) => (c.useParentCtx = useParentCtx));
    }

    allUserParentCtx(useParentCtx: boolean = true){
        this.useParentCtx = useParentCtx;
        this.childrenUseParentCtx(useParentCtx);
    }
}
