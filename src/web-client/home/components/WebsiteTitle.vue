<template>
<div class="website-title" :class="[titleSize]" @resize="recordElWidth">
    <div class="website-title-wrapper small heading" ref="website-title-wrapper">
        <router-link class="plain" to="/">蜂鸟博客</router-link>
    </div>
    <transition
        :css="false"
        @enter="enter"
        @leave="leave"
    >
        <div v-if="state === 'normal'" key="buttons" class="title-aux buttons">
            <div class="login f-small"><a class="plain" href="/login">登录</a></div>
            <div class="search f-small"><a class="plain" href="" @click.prevent="showSearchBox()">搜索</a></div>
        </div>
        <form v-else-if="state === 'search'" key="searchbox" class="title-aux searchbox" ref="searchbox">
            <input type="text" placeholder="搜索文章" class="" v-model="searchText" :style="searchBoxStyle" @keydown.enter="search"/>

            <div class="searchbox-buttons">
                <button type="button" class="search" @click="search">
                    <span class="material-icons">search</span>
                </button>
                <button type="button" class="cancel" @click="hideSearchBox()">
                    <span class="material-icons">close</span>
                </button>
            </div>
        </form>
    </transition>
</div>
</template>

<script>
import { getTransitionDurationMs } from '../../general/dom.js';

import searchIconPath from '../img/magnifier.svg';
import timesIconPath from '../img/times.svg';

export default {
    name: 'WebsiteTitle',

    props: [ 'size' ],

    mounted () {
        this.elWidth = this.$el.offsetWidth;
    },

    data () {
        return {
            state: 'normal',
            searchText: '',
            elWidth: null,

            searchIconPath,
            timesIconPath
        };
    },

    methods: {
        recordElWidth () {
            this.elWidth = this.$el.offsetWidth;
        },

        showSearchBox () {
            this.state = 'search';
        },

        hideSearchBox () {
            this.searchText = '';
            this.state = 'normal';
        },

        enter (el, done) {
            el.style.opacity = '0';

            setTimeout(() => {
                el.style.opacity = '1';
                if (el === this.$refs['searchbox']) {
                    el.style.width = '30%';
                    window.setTimeout(() => {
                        done();
                    }, 500);
                } else {
                    done();
                }
            }, 0);
        },

        leave (el, done) {
            el.style.opacity = '0';

            if (el == this.$refs['searchbox']) {
                el.style.width = '';
                window.setTimeout(() => {
                    done();
                }, 500);
            } else {
                done();
            }
        },

        search () {
            if (this.searchText === '') {
                alert('不能搜索空字符串');
            } else {
                this.$router.push(`/search/?s=${encodeURIComponent(this.searchText)}`);
            }
        }
    },

    computed: {
        titleSize () {
            return this.size == 'large' ? 'large' : 'small';
        },

        isSearchBoxVisible () {
            return this.state == 'search';
        },

        searchBoxStyle () {
            var style = {};
            if (this.isSearchBoxVisible) {
                return { width: String(this.$elWidth * 0.7) + 'px', opacity: '1' };
            } else {
                return { width: '',  opacity: 0 };
            }
        }
    },


}
</script>

<style scoped>
.website-title {
    width: 100%;
    padding: 1rem 0 0.5rem;
    border-bottom: 1px solid#D4D4D4;
    transition: font-size 0.5s, opacity 0.5s;
    position: relative;
    font-weight: bold;
}

.website-title > .website-title-wrapper {
    width: 4em;
    margin: 0 auto;
    white-space: nowrap;
    text-align: center;
}

.website-title > .website-title-wrapper {
    transition: font-size 0.5s;
}

.website-title.large > .website-title-wrapper {
    font-size: 3rem;
}

.website-title.small .website-title-wrapper {
    font-size: 2rem;
}

.title-aux {
    position: absolute;
    display: flex;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
}

.title-aux.buttons > * {
    display: flex;
    margin-left: 1em;
}

.title-aux.buttons:last-child {
    margin-left: 0;
}

.title-aux.buttons {
    transition: opacity 0.5s;
}

.title-aux.searchbox {
    border-bottom: 1px solid #D4D4D4;
    width: 5em;
    transition: opacity 0.5s, width 0.5s;
}

.title-aux.searchbox input {
    border: none;
    font-size: 1rem;
    padding: 0.5rem 0 5px;
    margin: 0;
    width: 100%;
}

.title-aux.searchbox .searchbox-buttons {
    position: absolute;
    padding: 0;
    margin: 0;
    right: 0;
    top: 50%;
    font-size: 1.5rem;
    transform: translateY(-50%);
}

.title-aux.searchbox-buttons .searchbox-buttons > button {
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    height: 1em;
    width: 1em;
}

.title-aux.searchbox-buttons .searchbox-buttons > button > .material-icons {
    display: block;
}
</style>
