import { Queue } from './queue';
import { Animator } from './animator';
import { Balloon } from './balloon';
export declare class AnimationInterface {
    queue: Queue;
    animator: Animator | undefined;
    backgroundPosition: string;
    balloon: Balloon;
    constructor();
    show(): void;
    hide(): void;
    speak(text: string, hold: boolean): void;
    stop(): void;
    hideBalloon(fast: boolean): void;
    animate(): void;
    queueAnimation(animation: string): void;
    onQueueEmpty(): void;
    private pause;
    private resume;
}
//# sourceMappingURL=animationInterface.d.ts.map