import { BreakActivityOptions } from "../activities/Break";
import { CodeActivityOptions } from "../activities/Code";
import { DelayActivityOptions } from "../activities/Delay";
import { ForActivityOptions } from "../activities/For";
import { FunctionActivityOptions } from "../activities/Function";
import { ParallelForActivityOptions } from "../activities/ParallelFor";
import { RequestActivityOptions } from "../activities/Request";
import { TerminateActivityOptions } from "../activities/Terminate";
import { DownloadFileActivityOptions } from "../activities/fs/DownloadFile";
import { ReadFileActivityOptions } from "../activities/fs/ReadFile";
import { RemoveFileActivityOptions } from "../activities/fs/RemoveFile";
import { WriteFileActivityOptions } from "../activities/fs/WriteFile";
import { CreateVariableActivityOptions } from "../activities/variable/CreateVariable";
import { DeleteVariableActivityOptions } from "../activities/variable/DeleteVariable";

export interface DefaultActivityOptions {}
// export declare type ActivityOptionsFor<Type extends keyof ActivityOptionsMap | keyof SVGElementTagNameMap> = Type extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[Type] : Type extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[Type] : never;

export interface ActivityOptionsMap {
    break: BreakActivityOptions;
    code: CodeActivityOptions;
    delay: DelayActivityOptions;
    doWhile: DelayActivityOptions;
    for: ForActivityOptions;
    function: FunctionActivityOptions;
    ifElse: DefaultActivityOptions;
    parallel: DefaultActivityOptions;
    parallelFor: ParallelForActivityOptions;
    race: DefaultActivityOptions;
    request: RequestActivityOptions;
    sequence: DefaultActivityOptions;
    terminate: TerminateActivityOptions;
    tryCatch: DefaultActivityOptions;
    while: DefaultActivityOptions;
    "fs.downloadFile": DownloadFileActivityOptions;
    "fs.writeFile": WriteFileActivityOptions;
    "fs.readFile": ReadFileActivityOptions;
    "fs.removeFile": RemoveFileActivityOptions;
    "v.create": CreateVariableActivityOptions;
    "v.delete": DeleteVariableActivityOptions;
}

export type ActivityType = keyof ActivityOptionsMap;
