import { AnimationStates } from './animations';
import { BehaviorSubject } from 'rxjs';
export declare class Animator {
    private started;
    private exiting;
    private currentAnimation;
    private endCallback;
    private loop;
    private currentFrame;
    private currentFrameIndex;
    private soundList;
    private animations;
    private queue;
    private loader;
    constructor();
    SetupData(name: string): Promise<void>;
    GetFramesize(): number[] | undefined;
    private GetAgentData;
    private GetSoundData;
    backgroundState: BehaviorSubject<string>;
    changePos(pos: string): void;
    clearTimeout(): void;
    getRandomAnimationName(typeName?: string): string;
    hasAnimation(name: string): boolean;
    exitAnimation(): void;
    showAnimation(animationName: string, callback: (state: AnimationStates) => void): Promise<unknown>;
    queueAnimation(animation: string): void;
    enqueueFunction(func: (complete: any) => void): void;
    showIdleAnimation(callback: (state: AnimationStates) => void): void;
    step(): void;
    private preloadSounds;
    private draw;
    private getNextAnimationFrame;
    private playSound;
    private atLastFrame;
    stopAnimating(showExitAnimation: boolean): void;
    onQueueEmpty(): void;
}
//# sourceMappingURL=animator.d.ts.map