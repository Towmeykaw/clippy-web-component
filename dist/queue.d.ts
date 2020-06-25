export declare class Queue {
    private active;
    private onEmptyCallback;
    private _queue;
    constructor();
    createCallback: (onEmptyCallback: any) => void;
    enqueue(func: (complete: any) => void): void;
    clear: () => void;
    private progressQueue;
    private next;
}
//# sourceMappingURL=queue.d.ts.map