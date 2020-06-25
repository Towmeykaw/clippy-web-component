import { LitElement } from 'lit-element';
declare class BalloonElement extends LitElement {
    private addWord;
    private loop;
    private active;
    private WORD_SPEAK_TIME;
    static get styles(): import("lit-element").CSSResult[];
    speakText: string;
    shownText: string;
    pauseWriting: boolean;
    render(): import("lit-element").TemplateResult;
    updated(changedProperties: Map<string, any>): void;
    speak(text: string): void;
    private sayWords;
    pause(): void;
    resume(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'balloon-element': BalloonElement;
    }
}
export {};
//# sourceMappingURL=balloon.d.ts.map