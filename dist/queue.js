export class Queue {
    constructor() {
        this.active = false;
        this.createCallback = (onEmptyCallback) => {
            this.onEmptyCallback = onEmptyCallback;
        };
        this.clear = () => {
            this._queue = [];
        };
        this.progressQueue = () => {
            if (!this._queue.length) {
                this.onEmptyCallback();
                return;
            }
            const f = this._queue.shift();
            this.active = true;
            const completeFunction = this.next.bind(this);
            if (f)
                f(completeFunction);
        };
        this.next = () => {
            this.active = false;
            this.progressQueue();
        };
        this._queue = [];
    }
    enqueue(func) {
        this._queue.push(func);
        if (this._queue.length === 1 && !this.active) {
            this.progressQueue();
        }
    }
}
//# sourceMappingURL=queue.js.map