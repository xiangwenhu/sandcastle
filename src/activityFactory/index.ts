import { register as _register, create, createChildren } from "./factory";
import Activity from "../activities/Activity";

import CodeActivity from "../activities/Code";
import DelayActivity from "../activities/Delay";
import SequenceActivity from "../activities/Sequence";
import ParallelActivity from "../activities/Parallel";
import RaceActivity from "../activities/Race";
import WhileActivity from "../activities/DoWhile";
import DoWhileActivity from "../activities/DoWhile";
import IFElseActivity from "../activities/IfElse";
import RequestActivity from "../activities/Request";
import BreakActivity from "../activities/Break";
import TerminateActivity from "../activities/Terminate";
import TryCatchActivity from "../activities/TryCatch";
import ForActivity from "../activities/For";
import ParallelForActivity from "../activities/ParallelFor";
import ReadFileActivity from "../activities/fs/ReadFile";
import WriteFileActivity from "../activities/fs/WriteFile";
import DownloadFileActivity from "../activities/fs/DownloadFile";
import RemoveFileActivity from "../activities/fs/RemoveFile";
import CreateVariableActivity from "../activities/variable/CreateVariable";
import DeleteVariableActivity from "../activities/variable/DeleteVariable";
import { isString } from "lodash";
import { ActivityConstructor, IFactoryP$HConfigValue } from "./factory.type";

const factory = {
    create,
    createChildren
}

function register<A extends Activity>(type: string,
    _class_: ActivityConstructor<A>,
    config: IFactoryP$HConfigValue = {},
) {
    _register(type, _class_, config);
}

register("code", CodeActivity, {
    params: ["code"]
});
register("delay", DelayActivity, {
    params: ["timeout"]
});
register("sequence", SequenceActivity);
register("parallel", ParallelActivity);
register("race", RaceActivity);
register("while", WhileActivity);
register("doWhile", DoWhileActivity);
register("ifElse", IFElseActivity, {
    before({ factory, globalContext, config, activity }) {
        const act = (activity! as IFElseActivity);
        act.if = factory.create(config.if, globalContext) as SequenceActivity;
        if (config.elseif) {
            act.elseif = factory.createChildren(config.elseif, globalContext) as SequenceActivity[];
        }
        if (config.else) {
            act.else = factory.create(config.else, globalContext) as SequenceActivity;
        }
    }
});
register("request", RequestActivity, {
    params: ["config"]
});
register("break", BreakActivity, {
    params: ["message"]
});
register("terminate", TerminateActivity, {
    params: ["message"]
});
register("tryCatch", TryCatchActivity);
register("for", ForActivity, {
    buildParams: ["values"]
});
register("parallelFor", ParallelForActivity, {
    params: ["values"]
});

// fs
register("fs.readFile", ReadFileActivity, {
    buildParams: ["dist", "type", "options"]
});
register("fs.writeFile", WriteFileActivity, {
    buildParams: ["dist", "content", "options"]
});
register("fs.downloadFile", DownloadFileActivity, {
    buildParams: ["url", "dist", "options"]
});
register("fs.removeFile", RemoveFileActivity, {
    buildParams: ["dist"]
});

// variable
register("v.create", CreateVariableActivity, {
    buildParams: ["vName", "value"]
});
register("v.delete", DeleteVariableActivity, {
    buildParams: ["vName"]
});


export default factory;

export {
    register
}