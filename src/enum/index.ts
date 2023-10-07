export enum EnumActivityStatus {
    /**
     未初始化
     */
    UNINITIALIZED = "UNINITIALIZED",
    /**
     * 初始化
     */
    INITIALIZED = "INITIALIZED",
    /**
     * 构建中
     */
    BUILDING = "BUILDING",
    /**
     * 构建完毕
     */
    BUILDED = "BUILDED",
    /**
     * 执行中
     */
    EXECUTING = "EXECUTING",
    /**
     * 执行完毕
     */
    EXECUTED = "EXECUTED",
    /**
     * 异常
     */
    EXCEPTION = "EXCEPTION",
    /**
     * 终止
     */
    TERMINATED = "TERMINATED",
}
