import { EventEmitter } from 'events';

export class Visibility extends EventEmitter {
    constructor (root) {
        super();
        this.$root = root;
        this.isVisible = false;
    }

    hide () {
        if (this.isVisible) {
            this.$root.style = "visibility: hidden";
            this.isVisible = false;
        }
    }

    show () {
        if (!this.isVisible) {
            this.$root.style = 'visibility: show';
            this.isVisible = true;
        }
    }
}
