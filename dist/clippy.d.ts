import { LitElement } from 'lit-element';
import './balloon';
export declare class ClippyElement extends LitElement {
    private agentType;
    private animator;
    private pauseWriting;
    private pos1;
    private pos2;
    private pos3;
    private pos4;
    private mouseDown;
    static get styles(): import("lit-element").CSSResult[];
    backgroundPosition: {
        'background-position': string;
        width: string;
        height: string;
    };
    name: string;
    hide: string;
    top: number;
    left: number;
    width: number;
    height: number;
    speakText: string;
    render(): import("lit-element").TemplateResult;
    constructor();
    updated(changedProperties: Map<string, any>): void;
    speak(text: string): void;
    hideBalloon(): void;
    animateElement(): void;
    queueAnimation(animation: string): void;
    onQueueEmpty(): void;
    stop(): void;
    private showElement;
    private hideElement;
    private pause;
    private resume;
    private onDoubleClick;
    private dragMouseDown;
    private elementDrag;
    private closeDragElement;
}
declare global {
    interface HTMLElementTagNameMap {
        'clippy-element': ClippyElement;
    }
}
//# sourceMappingURL=clippy.d.ts.map