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
import { IfElseActivityConfig, ITryCatchActivityConfig } from "../types/activity";

const factory = {
    create,
    createChildren
}

function register<A extends Activity<any, any, any, any, any>>(type: string,
    _class_: ActivityConstructor<A>,
    config: IFactoryP$HConfigValue = {},
) {
    _register(type, _class_, config);
}

register("code", CodeActivity);
register("delay", DelayActivity);
register("sequence", SequenceActivity);
register("parallel", ParallelActivity);
register("race", RaceActivity);
register("while", WhileActivity);
register("doWhile", DoWhileActivity);
register("ifElse", IFElseActivity, {
    before({ factory, globalContext, config, activity }) {
        const ifConfig = config as IfElseActivityConfig;
        const act = (activity! as any);
        act.if = factory.create(ifConfig.if, globalContext) as SequenceActivity;
        if (ifConfig.elseif) {
            act.elseif = factory.createChildren(ifConfig.elseif, globalContext) as SequenceActivity[];
        }
        if (ifConfig.else) {
            act.else = factory.create(ifConfig.else, globalContext) as SequenceActivity;
        }
    }
});
register("request", RequestActivity);
register("break", BreakActivity,);
register("terminate", TerminateActivity);
register("tryCatch", TryCatchActivity,{
    before({ factory, globalContext, config, activity }) {
        const ifConfig = config as ITryCatchActivityConfig;
        const act = (activity! as any);
        act.catch = factory.create(ifConfig.catch, globalContext) as SequenceActivity;
    }
});
register("for", ForActivity);
register("parallelFor", ParallelForActivity);

// fs
register("fs.readFile", ReadFileActivity);
register("fs.writeFile", WriteFileActivity);
register("fs.downloadFile", DownloadFileActivity);
register("fs.removeFile", RemoveFileActivity);

// variable
register("v.create", CreateVariableActivity);
register("v.delete", DeleteVariableActivity);


export default factory;

export {
    register
}