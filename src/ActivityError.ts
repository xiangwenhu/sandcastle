import Activity from "./activities/Activity";

class ActivityError extends Error {
    static isActivityError(err: any) {
        return typeof err === "object" && err instanceof ActivityError;
    }
    activity: Activity;
    constructor(message: string, activity: Activity<any, any, any, any, any>) {
        super(message);
        this.activity = activity;
        this.name = "ActivityError";
    }
}

class TerminateError extends ActivityError  {
    activity: Activity;
    constructor(message: string, activity: Activity<any, any, any, any, any>) {
        super(message, activity);
        this.activity = activity;
        this.name = "TerminateError";
    }
}

export { ActivityError, TerminateError };
