export interface Animations {
    overlayCount: number;
    sounds: string[];
    framesize: number[];
    animations: Animation[];
}
export interface Animation {
    name: string;
    frames: Frame[];
    useExitBranching?: boolean;
}
export interface Frame {
    duration: number;
    images?: Array<number[]>;
    sound?: string;
    exitBranch?: number;
    branching?: Branching;
}
export interface Branching {
    branches: Branch[];
}
export interface Branch {
    frameIndex: number;
    weight: number;
}
export declare class AnimationStates {
    static State: {
        WAITING: number;
        EXITED: number;
    };
}
//# sourceMappingURL=animations.d.ts.map