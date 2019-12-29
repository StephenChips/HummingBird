import { copyArrayLike } from '../../general/util';

import '../stylesheets/carousel.css';

export class Carousel {
    constructor (root) {
        this.$root = root;
        this.$carouselScroll = this.$root.children[0];

        this.$slides = copyArrayLike(this.$carouselScroll.children);

        var time = window.getComputedStyle(this.$carouselScroll).transitionDuration;

        this._transitionDuration = Number(time.substring(0, time.length - 1));

        this._createOffsetArray();

        this._currentSlide = 0;
        this._translateXOffset = 0;
        this._isMoving = false;

        this._initFirstSlide();

        this._initCarouselScrollWidth();
        this._resizeContainer();

    }

    _initCarouselScrollWidth () {
        this.carouselScrollWidth = this.$slides.reduce((acc, el) => acc + el.offsetWidth, 0);
        this.$carouselScroll.style.width = String(this.carouselScrollWidth) + 'px';
    }

    _initFirstSlide () {
        var firstSlide = this.$slides[this._currentSlide];
        firstSlide.classList.add('show');
        firstSlide.style.transition = 'none';
        window.setTimeout(() => {
            firstSlide.style.transition = '';
        });
    }

    show (index) {
        if (this._isMoving) {
            return;
        }

        if (index > 0 && index < this.$slides.length) {
            this._isMoving = true;

            var currentSlide = this.$slides[this._currentSlide];
            var nextSlide = this.$slides[index];

            this.$carouselScroll.style.transform = `translateX(-${this.offsetArray[index]}px)`;

            currentSlide.classList.remove('show');
            nextSlide.classList.add('show');

            this._resizeContainer();

            this._currentSlide = index;

            window.setTimeout(function () {
                this._isMoving = false;
            }, this._transitionDuration);
        }
    }

    next () {
        this.show(this._currentSlide + 1);
    }

    previous () {
        this.show(this._currentSlide - 1);
    }

    get hasNext () {
        return this._currentSlide < this.$slides.length - 1;
    }

    get hasPrevious () {
        return this._currentSlide > 0;
    }

    _resizeContainer () {
        this.containerHeight = this.$slides[this._currentSlide].offsetHeight;
        this.containerWidth = this.$slides[this._currentSlide].offsetWidth;
        this.$root.style.height = String(this.containerHeight) + 'px';
        this.$root.style.width = String(this.containerWidth) + 'px';
    }

    _createOffsetArray () {
        var sum = 0;

        this.offsetArray = new Array(this.$slides.length);

        for (var i = 0; i < this.$slides.length; i++) {
            this.offsetArray[i] = sum;
            sum += this.$slides[i].offsetWidth;
        }
    }
}
