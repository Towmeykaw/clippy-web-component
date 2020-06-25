import { Queue } from './queue';
import { AnimationStates } from './animationstates';
import { Balloon } from './balloon';
export class AnimationInterface {
    constructor() {
        this.queue = new Queue;
        this.backgroundPosition = '"0px 0px"';
        this.balloon = new Balloon;
        this.queue.createCallback(this.onQueueEmpty.bind(this));
    }
    show() {
        this.resume();
        this.animator.queueAnimation('Show');
    }
    hide() {
        this.stop();
        this.animator.showAnimation('Hide', () => {
            this.pause();
        });
    }
    speak(text, hold) {
        this.queue.enqueue((complete) => {
            if (this.balloon) {
                this.balloon.speak(complete, text, hold);
            }
            complete();
        });
    }
    stop() {
        this.queue.clear();
        this.animator.exitAnimation();
        if (this.balloon) {
            this.balloon.hide(false);
        }
    }
    hideBalloon(fast) {
        this.balloon.hide(fast);
    }
    animate() {
        const anim = this.animator.getRandomAnimationName();
        // skip idle animations
        if (anim.indexOf('Idle') === 0) {
            return this.animate();
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
    pause() {
        this.animator.clearTimeout();
        if (this.balloon) {
            this.balloon.pause();
        }
    }
    resume() {
        this.animator.step();
        if (this.balloon) {
            this.balloon.resume();
        }
    }
}
//# sourceMappingURL=animationInterface.js.map