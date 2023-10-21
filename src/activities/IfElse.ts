import { ActivityError } from "../ActivityError";
import { EnumActivityStatus } from "../enum";
import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";
import AssertSequenceActivity from "./AssertSequence";

export default class IFElseActivity<C = any, R = any> extends Activity<C, R> {

    accessor #if: AssertSequenceActivity | undefined = undefined;
    accessor #elseif: AssertSequenceActivity[] | undefined = undefined;
    accessor #else: AssertSequenceActivity | undefined = undefined;

    set if(value: AssertSequenceActivity | undefined) {
        this.#if = value;
        if (this.#if) {
            this.#if.parent = this;
            if (this.#if.assert) {
                this.#if.useParentCtx = true;
                this.#if.assert.useParentCtx = true
                this.#if.assert.children.forEach(c => c.useParentCtx = true);
            }
            this.#if.children.forEach(c => c.useParentCtx = true);
        }
    }
    get if(): AssertSequenceActivity | undefined {
        return this.#if;
    }

    set elseif(value: AssertSequenceActivity[] | undefined) {
        this.#elseif = value;
        if (this.#elseif) {
            this.#elseif.forEach(c => {
                c.parent = this;
                c.useParentCtx = true;
                if (c.assert) {
                    c.assert.useParentCtx = true;
                    c.assert.children.forEach(c => c.useParentCtx = true);
                }
                c.children.forEach(c => c.useParentCtx = true);
            });

        }
    }
    get elseif(): AssertSequenceActivity[] | undefined {
        return this.#elseif;
    }


    set else(value: AssertSequenceActivity | undefined) {
        this.#else = value;
        if (this.#else) {
            this.#else.parent = this;
            if (this.#else.assert) {
                this.#else.useParentCtx = true;
                this.#else.assert.useParentCtx = true
                this.#else.assert.children.forEach(c => c.useParentCtx = true);
            }
            this.#else.children.forEach(c => c.useParentCtx = true);
        }
    }
    get else(): AssertSequenceActivity | undefined {
        return this.#else;
    }

    constructor(context: C) {
        super(context);
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
        if (this.else) {
            sequenceCol.push(this.else);
        }

        return async (paramObj: IActivityRunParams) => {
            let assertR: boolean = false;
            for (let i = 0; i < sequenceCol.length; i++) {
                const act = sequenceCol[i];

                assertR = await act.assert?.run(paramObj) || false;
                // 执行后状态会被改变
                if (act.assert) {
                    act.assert.status = EnumActivityStatus.BUILDED;
                }
                if (assertR) {
                    return act.run(paramObj);
                }
            }
        };
    }
}
