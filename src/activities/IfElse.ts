import { ActivityError } from "../ActivityError";
import { EnumActivityStatus } from "../enum";
import { IActivityExecuteParams } from "../types/activity";
import Activity from "./Activity";
import SequenceActivity from "./Sequence";

export default class IFElseActivity<C = any, R = any, O = any> extends Activity<C, R, O> {
    accessor #if: SequenceActivity | undefined = undefined;
    accessor #elseif: SequenceActivity[] | undefined = undefined;
    accessor #else: SequenceActivity | undefined = undefined;

    set if(value: SequenceActivity | undefined) {
        this.#if = value;
        if (this.#if) {
            this.#if.parent = this;
        }
    }
    get if(): SequenceActivity | undefined {
        return this.#if;
    }

    set elseif(value: SequenceActivity[] | undefined) {
        this.#elseif = value;
        if (this.#elseif) {
            this.#elseif.forEach((c) => {
                c.parent = this;
            });
        }
    }
    get elseif(): SequenceActivity[] | undefined {
        return this.#elseif;
    }

    set else(value: SequenceActivity | undefined) {
        this.#else = value;
        if (this.#else) {
            this.#else.parent = this;
        }
    }
    get else(): SequenceActivity | undefined {
        return this.#else;
    }

    constructor(context: C, public options: O) {
        super(context, options);
        this.type = "ifElse";
    }

    buildTask() {
        if (!this.if) {
            throw new ActivityError("if未定义", this);
        }

        const sequenceCol = [this.if];
        if (this.elseif) {
            sequenceCol.push(...this.elseif);
        }

        return async (paramObj: IActivityExecuteParams) => {
            let assertR: boolean = false;
            for (let i = 0; i < sequenceCol.length; i++) {
                const act = sequenceCol[i];

                assertR = (await act.assert?.run(paramObj)) || false;
                // 执行后状态会被改变
                if (act.assert) {
                    act.assert.status = EnumActivityStatus.BUILDED;
                }
                if (assertR) {
                    return act.run(paramObj);
                }
            }
            if (this.#else) {
                return this.#else.run(paramObj);
            }
        };
    }
}
