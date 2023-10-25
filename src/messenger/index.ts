import { EventEmitter } from "events";
import { ActEventName } from "../types/activity";

export default class Messenger {
    #emitter = new EventEmitter();

    on(eventName: ActEventName, listener: (...args: any[]) => void) {
        return this.#emitter.on(eventName, listener);
    }

    off(eventName: ActEventName, listener: (...args: any[]) => void) {
        return this.#emitter.off(eventName, listener);
    }

    emit(eventName: ActEventName, ...args: any[]) {
        return this.#emitter.emit(eventName, ...args);
    }
}
