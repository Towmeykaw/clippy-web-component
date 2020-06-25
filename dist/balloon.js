var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, LitElement, html, property } from 'lit-element';
import { balloonStyles } from './balloonstyles';
let BalloonElement = class BalloonElement extends LitElement {
    constructor() {
        super(...arguments);
        this.active = false;
        this.WORD_SPEAK_TIME = 200;
        this.speakText = '';
        this.shownText = '';
        this.pauseWriting = false;
    }
    static get styles() {
        return [balloonStyles];
    }
    render() {
        return html `
            ${this.speakText !== ''
            ? html ` <div id="balloon" class="clippy-balloon">
                      <div id="balloon-content" class="clippy-content">${this.shownText}</div>
                      <div class="clippy-tip"></div>
                  </div>`
            : html ``}
        `;
    }
    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            if (propName == 'speakText') {
                this.speak(this.speakText);
            }
            if (propName == 'pauseWriting') {
                if (oldValue == null) {
                    return;
                }
                if (this.pauseWriting === true) {
                    this.pause();
                }
                else {
                    this.resume();
                }
            }
        });
    }
    speak(text) {
        this.sayWords(text);
    }
    sayWords(text) {
        this.active = true;
        const words = text.split(/[^\S-]/);
        const time = this.WORD_SPEAK_TIME;
        let idx = 1;
        this.addWord = () => {
            if (!this.active) {
                return;
            }
            if (idx > words.length) {
                delete this.addWord;
                this.active = false;
            }
            else {
                this.shownText = words.slice(0, idx).join(' ');
                idx++;
                this.loop = setTimeout(this.addWord.bind(this), time);
            }
        };
        this.addWord();
    }
    pause() {
        clearTimeout(this.loop);
    }
    resume() {
        if (this.addWord) {
            this.addWord();
        }
    }
};
__decorate([
    property({ type: String })
], BalloonElement.prototype, "speakText", void 0);
__decorate([
    property({ type: String })
], BalloonElement.prototype, "shownText", void 0);
__decorate([
    property({ type: Boolean })
], BalloonElement.prototype, "pauseWriting", void 0);
BalloonElement = __decorate([
    customElement('balloon-element')
], BalloonElement);
//# sourceMappingURL=balloon.js.map