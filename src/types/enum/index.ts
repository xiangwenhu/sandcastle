export enum EnumActivityStatus {
    /**
     未初始化
     */
    UNINITIALIZED = 0,
    /**
     * 初始化
     */
    INITIALIZED = 1,
    /**
     * 构建中
     */
    BUILDING = 2,
    /**
     * 构建完毕
     */
    BUILDED = 3,
    /**
     * 执行中
     */
    EXECUTING = 4,
    /**
     * 执行完毕
     */
    EXECUTED = 5,
    /**
     * 异常
     */
    EXCEPTION = 9,
    /**
     * 终止
     */
    TERMINATED = 10,
}
