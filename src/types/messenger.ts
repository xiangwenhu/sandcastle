export interface IMessenger{
    on(eventName: string | Symbol, listener: (...args: any[]) => void): any;

    off(eventName: string | Symbol, listener: (...args: any[]) => void): any;

    emit(eventName: string | Symbol, ...args: any[]): any;

    removeAllListeners(name: string | symbol | undefined): any
}
