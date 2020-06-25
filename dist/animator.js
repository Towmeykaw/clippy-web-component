import { AnimationStates } from './animations';
import { Queue } from './queue';
import { BehaviorSubject } from 'rxjs';
import { Loader } from './loader';
export class Animator {
    constructor() {
        this.started = false;
        this.exiting = false;
        this.currentFrameIndex = 0;
        this.backgroundState = new BehaviorSubject('0px 0px');
        this.queue = new Queue();
        this.loader = new Loader();
        this.queue.createCallback(this.onQueueEmpty.bind(this));
    }
    async SetupData(name) {
        this.animations = (await this.GetAgentData(name));
        this.preloadSounds((await this.GetSoundData(name)));
    }
    GetFramesize() {
        var _a;
        return (_a = this.animations) === null || _a === void 0 ? void 0 : _a.framesize;
    }
    async GetAgentData(name) {
        return await this.loader.loadAgent(name);
    }
    async GetSoundData(name) {
        return await this.loader.loadSounds(name);
    }
    changePos(pos) {
        this.backgroundState.next(pos);
    }
    clearTimeout() {
        clearTimeout(this.loop);
    }
    getRandomAnimationName(typeName) {
        const nameList = new Array();
        const filteredList = new Array();
        if (this.animations)
            for (const n of this.animations.animations) {
                nameList.push(n.name);
            }
        if (typeName) {
            for (let i = 0; i < nameList.length; i++) {
                const a = nameList[i];
                if (a.indexOf(typeName) === 0) {
                    filteredList.push(a);
                }
            }
            // pick one
            const idx = Math.floor(Math.random() * filteredList.length);
            return filteredList[idx];
        }
        else {
            const idx = Math.floor(Math.random() * nameList.length);
            return nameList[idx];
        }
    }
    hasAnimation(name) {
        var _a;
        return (((_a = this.animations) === null || _a === void 0 ? void 0 : _a.animations.find((x) => x.name === name)) !=
            undefined);
    }
    exitAnimation() {
        this.exiting = true;
    }
    showAnimation(animationName, callback) {
        return new Promise(() => {
            var _a;
            this.exiting = false;
            if (!this.hasAnimation(animationName)) {
                return false;
            }
            this.currentAnimation = (_a = this.animations) === null || _a === void 0 ? void 0 : _a.animations.find((f) => f.name === animationName);
            this.currentFrameIndex = 0;
            this.currentFrame = undefined;
            if (!this.started) {
                this.step();
                this.started = true;
            }
            this.endCallback = callback;
            return true;
        });
    }
    queueAnimation(animation) {
        if (!this.hasAnimation(animation)) {
            return;
        }
        this.queue.enqueue((complete) => {
            let completed = false;
            window.setTimeout(() => {
                if (completed) {
                    return;
                }
                // exit after timeout
                this.exitAnimation();
            }, 5000);
            this.showAnimation(animation, (state) => {
                if (state === AnimationStates.State.EXITED) {
                    completed = true;
                    complete();
                }
            });
        });
    }
    enqueueFunction(func) {
        this.queue.enqueue(func);
    }
    showIdleAnimation(callback) {
        this.showAnimation(this.getRandomAnimationName('Idle'), callback);
    }
    step() {
        var _a, _b;
        if (!this.currentAnimation) {
            return;
        }
        const newFrameIndex = Math.min(this.getNextAnimationFrame(), this.currentAnimation.frames.length - 1);
        const frameChanged = !this.currentFrame || this.currentFrameIndex !== newFrameIndex;
        this.currentFrameIndex = newFrameIndex;
        // always switch frame data, unless we're at the last frame of an animation with a useExitBranching flag.
        if (!(this.atLastFrame() && this.currentAnimation.useExitBranching)) {
            this.currentFrame = this.currentAnimation.frames[this.currentFrameIndex];
        }
        this.draw();
        this.playSound();
        this.loop = setTimeout(this.step.bind(this), (_b = (_a = this.currentFrame) === null || _a === void 0 ? void 0 : _a.duration) !== null && _b !== void 0 ? _b : 100);
        // fire events if the frames changed and we reached an end
        if (this.endCallback && frameChanged && this.atLastFrame()) {
            if (this.currentAnimation.useExitBranching && !this.exiting) {
                this.endCallback(AnimationStates.State.WAITING);
            }
            else {
                this.endCallback(AnimationStates.State.EXITED);
            }
        }
    }
    preloadSounds(sounds) {
        if (this.animations)
            for (let i = 0; i < this.animations.sounds.length; i++) {
                const snd = this.animations.sounds[i];
                const uri = sounds[Number(snd)];
                if (!uri) {
                    continue;
                }
                if (this.soundList == undefined)
                    this.soundList = [{ name: snd, audio: new Audio(uri) }];
                else
                    this.soundList.push({ name: snd, audio: new Audio(uri) });
            }
    }
    draw() {
        let images = [];
        if (this.currentFrame) {
            images = this.currentFrame.images || [];
        }
        for (let i = 0; i < images.length; i++) {
            const xy = images[i];
            const bg = -xy[0] + 'px ' + -xy[1] + 'px';
            this.changePos(bg);
        }
    }
    getNextAnimationFrame() {
        if (!this.currentAnimation) {
            return 0;
        }
        // No current frame. start animation.
        if (!this.currentFrame) {
            return 0;
        }
        const currentFrame = this.currentFrame;
        const branching = this.currentFrame.branching;
        if (this.exiting && currentFrame.exitBranch !== undefined) {
            return currentFrame.exitBranch;
        }
        else if (branching) {
            let rnd = Math.random() * 100;
            for (let i = 0; i < branching.branches.length; i++) {
                const branch = branching.branches[i];
                if (rnd <= branch.weight) {
                    return branch.frameIndex;
                }
                rnd -= branch.weight;
            }
        }
        return this.currentFrameIndex + 1;
    }
    playSound() {
        var _a, _b;
        if (!this.currentFrame)
            return;
        const s = this.currentFrame.sound;
        if (!s) {
            return;
        }
        const audio = (_b = (_a = this.soundList) === null || _a === void 0 ? void 0 : _a.find((f) => f.name === s)) === null || _b === void 0 ? void 0 : _b.audio;
        if (audio) {
            audio.play();
        }
    }
    atLastFrame() {
        if (this.currentAnimation)
            return (this.currentFrameIndex >=
                this.currentAnimation.frames.length - 1);
        return true;
    }
    stopAnimating(showExitAnimation) {
        this.queue.clear();
        if (showExitAnimation)
            this.exitAnimation();
    }
    onQueueEmpty() {
        this.showIdleAnimation((state) => {
            if (state === AnimationStates.State.EXITED) {
                this.onQueueEmpty();
            }
        });
    }
}
//# sourceMappingURL=animator.js.map