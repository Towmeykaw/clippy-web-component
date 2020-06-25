var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map.js';
import { agentStyles } from './styles';
import { Animator } from './animator';
import './balloon';
import { AnimationStates } from './animations';
let ClippyElement = class ClippyElement extends LitElement {
    constructor() {
        super();
        this.pauseWriting = false;
        this.mouseDown = false;
        this.backgroundPosition = {
            'background-position': '0px 0px',
            width: '0px',
            height: '0px'
        };
        this.name = 'Clippy';
        this.hide = 'false';
        this.top = 0;
        this.left = 0;
        this.width = 0;
        this.height = 0;
        this.speakText = '';
        this.hideElement = () => {
            this.stop();
            this.animator.showAnimation('Hide', () => {
                this.pause();
            });
            setTimeout(() => {
                this.hide = 'true';
            }, 300);
        };
        this.dragMouseDown = (e) => {
            e.preventDefault();
            // get the mouse cursor position at startup:
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;
            this.mouseDown = true;
        };
        this.elementDrag = (e) => {
            e.preventDefault();
            if (this.mouseDown) {
                // calculate the new cursor position:
                this.pos1 = this.pos3 - e.clientX;
                this.pos2 = this.pos4 - e.clientY;
                this.pos3 = e.clientX;
                this.pos4 = e.clientY;
                // set the element's new position:
                this.top = this.top - this.pos2;
                this.left = this.left - this.pos1;
            }
        };
        this.closeDragElement = () => {
            // stop moving when mouse button is released:
            this.mouseDown = false;
        };
        this.pos1 = this.pos2 = this.pos3 = this.pos4 = 0;
        this.agentType = this.name;
        document.onmouseup = this.closeDragElement;
        this.animator = new Animator();
        this.animator.SetupData(this.agentType).then(() => {
            let frameSize = this.animator.GetFramesize();
            if (frameSize) {
                this.width = frameSize[0];
                this.height = frameSize[1];
            }
            if (this.hide == 'false') {
                this.showElement();
            }
        });
        this.animator.backgroundState.subscribe((state) => {
            this.backgroundPosition = {
                'background-position': state,
                width: this.width + 'px',
                height: this.height + 'px'
            };
        });
    }
    static get styles() {
        return [agentStyles];
    }
    render() {
        let containerStyle = { top: this.top + 'px', left: this.left + 'px' };
        return html `
            <div
                id="clippy-agent"
                class="agent-container"
                style=${styleMap(containerStyle)}
                ?hidden=${this.hide === 'true'}
            >
                <balloon-element
                    .speakText=${this.speakText}
                    .pauseWriting=${this.pauseWriting}
                >
                </balloon-element>
                <div
                    class="agent"
                    id=${this.agentType}
                    style=${styleMap(this.backgroundPosition)}
                    @dblclick="${this.onDoubleClick}"
                    @mousedown="${this.dragMouseDown}"
                    @mousemove="${this.elementDrag}"
                ></div>
            </div>
        `;
    }
    updated(changedProperties) {
        changedProperties.forEach((_oldValue, propName) => {
            if (propName == 'hide') {
                if (this.animator.hasAnimation('Show')) {
                    if (this.hide == 'true') {
                        this.hideElement();
                    }
                    else if (this.hide == 'false') {
                        this.showElement();
                    }
                }
            }
        });
    }
    speak(text) {
        this.speakText = text;
    }
    hideBalloon() {
        this.speakText = '';
    }
    animateElement() {
        const anim = this.animator.getRandomAnimationName();
        // skip idle animations
        if (anim.indexOf('Idle') === 0) {
            return this.animateElement();
        }
        this.animator.queueAnimation(anim);
    }
    queueAnimation(animation) {
        this.animator.queueAnimation(animation);
    }
    onQueueEmpty() {
        this.animator.showIdleAnimation((state) => {
            if (state === AnimationStates.State.EXITED) {
                this.onQueueEmpty();
            }
        });
    }
    stop() {
        this.animator.stopAnimating(true);
        this.hideBalloon();
    }
    showElement() {
        this.resume();
        this.animator.queueAnimation('Show');
        this.hide = 'false';
    }
    pause() {
        this.animator.clearTimeout();
        this.pauseWriting = true;
    }
    resume() {
        this.animator.step();
        this.pauseWriting = false;
    }
    onDoubleClick() {
        var _a;
        (_a = this.animator) === null || _a === void 0 ? void 0 : _a.stopAnimating(false);
        this.animateElement();
    }
};
__decorate([
    property({ type: Object })
], ClippyElement.prototype, "backgroundPosition", void 0);
__decorate([
    property({ type: String })
], ClippyElement.prototype, "name", void 0);
__decorate([
    property({ type: String })
], ClippyElement.prototype, "hide", void 0);
__decorate([
    property({ type: Number })
], ClippyElement.prototype, "top", void 0);
__decorate([
    property({ type: Number })
], ClippyElement.prototype, "left", void 0);
__decorate([
    property({ type: Number })
], ClippyElement.prototype, "width", void 0);
__decorate([
    property({ type: Number })
], ClippyElement.prototype, "height", void 0);
__decorate([
    property({ type: String })
], ClippyElement.prototype, "speakText", void 0);
ClippyElement = __decorate([
    customElement('clippy-element')
], ClippyElement);
export { ClippyElement };
