import { ILogger } from "./logger";
import { IMessenger } from "./messenger";

export interface ICreateInstanceOptions {
    logger?: ILogger;
    messenger?: IMessenger;
}