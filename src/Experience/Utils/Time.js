import EventEmitter from "events";

export default class Time extends EventEmitter {
    constructor () {
        super();

        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        window.requestAnimationFrame(() => {
            this.tick();
        });
    }
    tick() {

        const currentTime = Date.now();
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        window.requestAnimationFrame(() => {
            this.tick();

            this.emit('tick');

        });
    }
}