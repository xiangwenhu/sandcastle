import Activity from "../activities/Activity";
import { GLOBAL_BUILTIN_CONTEXT } from "../const";

import { BreakActivityOptions } from "../activities/Break";
import { CodeActivityOptions } from "../activities/Code";
import ContainerActivity from "../activities/ContainerActivity";
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
import { $ActivityOptions } from "../crawlActivities/$";
import { $$ActivityOptions } from "../crawlActivities/$$";
import { $$EvalActivityOptions } from "../crawlActivities/$$Eval";
import { $EvalActivityOptions } from "../crawlActivities/$Eval";
import { ActionActivityOptions } from "../crawlActivities/ActionActivity";
import { AddScriptTagActivityOptions } from "../crawlActivities/AddScriptTag";
import { AddStyleTagActivityOptions } from "../crawlActivities/AddStyleTag";
import { ClearValueActivityOptions } from "../crawlActivities/ClearValue";
import { ClickActivityOptions } from "../crawlActivities/Click";
import { EvaluateActivityOptions } from "../crawlActivities/Evaluate";
import { EvaluateClickActivityOptions } from "../crawlActivities/EvaluateClick";
import { ExposeFunctionActivityOptions } from "../crawlActivities/ExposeFunction";
import { FetchActivityOptions } from "../crawlActivities/Fetch";
import { FocusActivityOptions } from "../crawlActivities/Focus";
import { GoBackActivityOptions } from "../crawlActivities/GoBack";
import { GoForwardActivityOptions } from "../crawlActivities/GoForward";
import { GotoActivityOptions } from "../crawlActivities/Goto";
import { HoverActivityOptions } from "../crawlActivities/Hover";
import { PdfActivityOptions } from "../crawlActivities/Pdf";
import PropertyActivity from "../crawlActivities/PropertyActivity";
import { ReloadActivityOptions } from "../crawlActivities/Reload";
import { RemoveExposedFunctionActivityOptions } from "../crawlActivities/RemoveExposedFunction";
import { ScreenshotActivityOptions } from "../crawlActivities/Screenshot";
import { SelectActivityOptions } from "../crawlActivities/Select";
import { SetExtraHTTPHeadersActivityOptions } from "../crawlActivities/SetExtraHTTPHeaders";
import { SetGeolocationActivityOptions } from "../crawlActivities/SetGeolocation";
import { SetRequestInterceptionActivityOptions } from "../crawlActivities/SetRequestInterception";
import { SetUserAgentActivityOptions } from "../crawlActivities/SetUserAgent";
import { SetViewportActivityOptions } from "../crawlActivities/SetViewport";
import { TypeActivityOptions } from "../crawlActivities/Type";
import { UploadFileActivityOptions } from "../crawlActivities/UploadFile";
import { WaitForNavigationActivityOptions } from "../crawlActivities/WaitForNavigation";
import { WaitForRequestActivityOptions } from "../crawlActivities/WaitForRequest";
import { WaitForResponseActivityOptions } from "../crawlActivities/WaitForResponse";
import { WaitForSelectorActivityOptions } from "../crawlActivities/WaitForSelector";
import { KeyboardDownActivityOptions } from "../crawlActivities/keyboard/Down";
import { KeyboardUpActivityOptions } from "../crawlActivities/keyboard/Press";
import { KeyboardSendCharacterActivityOptions } from "../crawlActivities/keyboard/SendCharacter";
import { KeyboardTypeActivityOptions } from "../crawlActivities/keyboard/Type";
import { MouseClickActivityOptions } from "../crawlActivities/mouse/Click";
import { MouseDownActivityOptions } from "../crawlActivities/mouse/Down";
import { MouseDragActivityOptions } from "../crawlActivities/mouse/Drag";
import { MouseDragAndDropActivityOptions } from "../crawlActivities/mouse/DragAndDrop";
import { MouseDragEnterActivityOptions } from "../crawlActivities/mouse/DragEnter";
import { MouseDragOverActivityOptions } from "../crawlActivities/mouse/DragOver";
import { MouseDropActivityOptions } from "../crawlActivities/mouse/Drop";
import { MouseMoveActivityOptions } from "../crawlActivities/mouse/Move";
import { MouseUpActivityOptions } from "../crawlActivities/mouse/Up";
import { MouseWheelActivityOptions } from "../crawlActivities/mouse/Wheel";
import GlobalBuiltinContext from "../globalBuiltinContext";
import { type } from "os";

export declare type ActConfigFor<Type extends ActivityType> =
    Type extends keyof ActivityConfigMap
        ? ActivityConfigMap[Type]
        : DefaultActivityOptions;

export interface DefaultActivityOptions {}
// export declare type ActivityOptionsFor<Type extends keyof ActivityOptionsMap | keyof SVGElementTagNameMap> = Type extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[Type] : Type extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[Type] : never;

export interface ActivityConfigMap {
    break: IActivityConfig<any, BreakActivityOptions>;
    code: IActivityConfig<any, CodeActivityOptions>;
    delay: IActivityConfig<any, DelayActivityOptions>;
    doWhile: IActivityConfig<any, DelayActivityOptions>;
    for: IActivityConfig<any, ForActivityOptions>;
    function: IActivityConfig<any, FunctionActivityOptions>;
    ifElse: IActivityConfig<any, DefaultActivityOptions>;
    parallel: IActivityConfig<any, DefaultActivityOptions>;
    parallelFor: IActivityConfig<any, ParallelForActivityOptions>;
    race: IActivityConfig<any, DefaultActivityOptions>;
    request: IActivityConfig<any, RequestActivityOptions>;
    sequence: IActivityConfig<any, DefaultActivityOptions>;
    terminate: IActivityConfig<any, TerminateActivityOptions>;
    tryCatch: ITryCatchActivityConfig<any, DefaultActivityOptions>;
    while: IActivityConfig<any, DefaultActivityOptions>;
    "fs.downloadFile": IActivityConfig<any, DownloadFileActivityOptions>;
    "fs.writeFile": IActivityConfig<any, WriteFileActivityOptions>;
    "fs.readFile": IActivityConfig<any, ReadFileActivityOptions>;
    "fs.removeFile": IActivityConfig<any, RemoveFileActivityOptions>;
    "v.create": IActivityConfig<any, CreateVariableActivityOptions>;
    "v.delete": IActivityConfig<any, DeleteVariableActivityOptions>;

    "c.browser": IActivityConfig<any, BreakActivityOptions>;
    "c.page": IActivityConfig<any, DefaultActivityOptions>;
    "c.page.click": IActivityConfig<any, ClickActivityOptions>;
    "c.page.close": IActivityConfig<any, DefaultActivityOptions>;
    "c.page.content": IActivityConfig<any, DefaultActivityOptions>;
    "c.page.evaluate": IActivityConfig<any, EvaluateActivityOptions>;
    "c.page.eClick": IActivityConfig<any, EvaluateClickActivityOptions>;
    "c.page.fetch": IActivityConfig<any, FetchActivityOptions>;
    "c.page.goBack": IActivityConfig<any, GoBackActivityOptions>;
    "c.page.goForward": IActivityConfig<any, GoForwardActivityOptions>;
    "c.page.isClosed": IActivityConfig<any, CodeActivityOptions>;
    "c.page.reload": IActivityConfig<any, ReloadActivityOptions>;
    "c.page.setCookie": IActivityConfig<any, CodeActivityOptions>;
    "c.page.setUserAgent": IActivityConfig<any, SetUserAgentActivityOptions>;
    "c.page.title": IActivityConfig<any, DefaultActivityOptions>;
    "c.page.type": IActivityConfig<any, TypeActivityOptions>;
    "c.page.url": IActivityConfig<any, DefaultActivityOptions>;
    "c.page.waitForNavigation": IActivityConfig<
        any,
        WaitForNavigationActivityOptions
    >;
    "c.page.waitForRequest": IActivityConfig<
        any,
        WaitForRequestActivityOptions
    >;
    "c.page.waitForResponse": IActivityConfig<
        any,
        WaitForResponseActivityOptions
    >;
    "c.page.waitForSelector": IActivityConfig<
        any,
        WaitForSelectorActivityOptions
    >;
    "c.page.cookies": IActivityConfig<any, DefaultActivityOptions>;
    "c.page.goto": IActivityConfig<any, GotoActivityOptions>;
    "c.page.$eval": IActivityConfig<any, $EvalActivityOptions>;
    "c.page.$$eval": IActivityConfig<any, $$EvalActivityOptions>;
    "c.page.focus": IActivityConfig<any, FocusActivityOptions>;
    "c.page.hover": IActivityConfig<any, HoverActivityOptions>;
    "c.page.clearValue": IActivityConfig<any, ClearValueActivityOptions>;
    "c.page.uploadFile": IActivityConfig<any, UploadFileActivityOptions>;
    "c.page.$": IActivityConfig<any, $ActivityOptions>;
    "c.page.$$)": IActivityConfig<any, $$ActivityOptions>;

    // keyboard
    "c.page.keyboard.down": IActivityConfig<any, KeyboardDownActivityOptions>;
    "c.page.keyboard.up": IActivityConfig<any, KeyboardUpActivityOptions>;
    "c.page.keyboard.sendCharacter": IActivityConfig<
        any,
        KeyboardSendCharacterActivityOptions
    >;
    "c.page.keyboard.type": IActivityConfig<any, KeyboardTypeActivityOptions>;
    "c.page.keyboard.press": IActivityConfig<any, KeyboardUpActivityOptions>;

    // mouse
    "c.page.mouse.click": IActivityConfig<any, MouseClickActivityOptions>;
    "c.page.mouse.down": IActivityConfig<any, MouseDownActivityOptions>;
    "c.page.mouse.drag": IActivityConfig<any, MouseDragActivityOptions>;
    "c.page.mouse.dragAndDrop": IActivityConfig<
        any,
        MouseDragAndDropActivityOptions
    >;
    "c.page.mouse.dragEnter": IActivityConfig<
        any,
        MouseDragEnterActivityOptions
    >;
    "c.page.mouse.dragOver": IActivityConfig<any, MouseDragOverActivityOptions>;
    "c.page.mouse.drop": IActivityConfig<any, MouseDropActivityOptions>;
    "c.page.mouse.move": IActivityConfig<any, MouseMoveActivityOptions>;
    "c.page.mouse.reset": IActivityConfig<any, DefaultActivityOptions>;
    "c.page.mouse.up": IActivityConfig<any, MouseUpActivityOptions>;
    "c.page.mouse.wheel": IActivityConfig<any, MouseWheelActivityOptions>;
    "c.page.exposeFunction": IActivityConfig<
        any,
        ExposeFunctionActivityOptions
    >;
    "c.page.removeExposedFunction": IActivityConfig<
        any,
        RemoveExposedFunctionActivityOptions
    >;
    "c.page.pdf": IActivityConfig<any, PdfActivityOptions>;
    "c.page.screenshot": IActivityConfig<any, ScreenshotActivityOptions>;
    "c.page.setViewport": IActivityConfig<any, SetViewportActivityOptions>;
    "c.page.setRequestInterception": IActivityConfig<
        any,
        SetRequestInterceptionActivityOptions
    >;
    "c.page.setExtraHTTPHeaders": IActivityConfig<
        any,
        SetExtraHTTPHeadersActivityOptions
    >;
    "c.page.setGeolocation": IActivityConfig<
        any,
        SetGeolocationActivityOptions
    >;
    "c.page.addScriptTag": IActivityConfig<any, AddScriptTagActivityOptions>;
    "c.page.addStyleTag": IActivityConfig<any, AddStyleTagActivityOptions>;
    "c.page.select": IActivityConfig<any, SelectActivityOptions>;

    "c.page.action": IActivityConfig<any, ActionActivityOptions>;
    "c.page.property": IActivityConfig<any, PropertyActivity>;
}

export interface IActivityConfig<C = any, O = any, E = any> {
    /**
     * 类型
     */
    type: ActivityType;
    /**
     * 上下文
     */
    context?: C;
    /**
     * 名字
     */
    name: string;
    /**
     * 孩子节点
     */
    children?: IActivityConfig[];
    /**
     * 活动执行前
     */
    before?: IActivityConfig | string | null | undefined;
    /**
     * 活动执行后
     */
    after?: IActivityConfig | string | null | undefined;
    /**
     * 是否执行的断言
     */
    assert?: string | IActivityConfig;
    /**
     * 是否使用父节点的上下文
     */
    useParentCtx?: boolean;
    /**
     * Activity存入变量$a
     */
    toVariable?: string;
    /**
     * task启动的选项
     */
    options?: O;
    /**
     * 额外的选项
     */
    eOptions?: E;
    deepReplace?: boolean;
    /**
     * options是否替换数组
     */
    replaceArray?: boolean;
    /**
     * 是否等活动执行完毕
     */
    waiting?: boolean;
}

export type ActivityType = keyof ActivityConfigMap;

export interface IfElseActivityConfig<C = any, O = any, E = any>
    extends IActivityConfig {
    if: IActivityConfig;
    elseif?: IActivityConfig[];
    else?: IActivityConfig;
}

export interface ITryCatchActivityConfig<C = any, O = any, E = any>
    extends IActivityConfig {
    catch: IActivityConfig;
}

export interface IFunctionActivityConfig<C = any, O = any, E = any>
    extends IActivityConfig {
    task: IActivityTaskFunction;
}

export interface ActivityFactory<
    P extends IActivityConfig = any,
    A extends Activity = Activity | ContainerActivity
> {
    (props: P, globalContext?: any): A;
}

export interface ActivityChildrenFactory<
    P extends IActivityConfig = any,
    A extends Activity = any
> {
    (props: P[], globalContext?: any): A[];
}

export interface ActivityFactoryFactory<P extends IActivityConfig = any> {
    create: ActivityFactory<P>;
    createChildren: ActivityChildrenFactory<P>;
}

export type GlobalActivityContext =  {
    [GLOBAL_BUILTIN_CONTEXT]: GlobalBuiltinContext
} & Record<PropertyKey, any>

export type ExtendParams = Record<string, any>;

export type IActivityRunParams<E extends ExtendParams = {}> = {
    $preRes?: any;
    $extra?: Record<PropertyKey, any>;
} & E;

export type IActivityExecuteParams<
    ER extends ExtendParams = {},
    EE extends ExtendParams = {}
> = {
    /**
     * 上下文
     */
    $ctx: any;
    /**
     * 全局上下文
     */
    $gCtx: Record<PropertyKey, any>;
    /**
     * 内置常量
     */
    $c: Record<string, any>;
    /**
     * 内置方法
     */
    $m: Record<string, Function>;
    /**
     * 全局变量
     */
    $v: Record<string, any>;
    /**
     * 父节点
     */
    $parent: Activity | undefined;
    /**
     * 上一个活动的返回值
     */
    $res: any;

    $a: Record<string, Activity>;
} & EE &
    IActivityRunParams<ER>;

export interface IActivityTaskFunction<
    ER extends ExtendParams = {},
    EE extends ExtendParams = {}
> {
    (paramObject: IActivityExecuteParams<ER, EE>): any;
}

export type ActEventName = "status" | "error" | "break" | "terminate";
