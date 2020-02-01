<template>
<div class="website-title" :class="[titleSize]" @resize="recordElWidth">
    <div class="heading" ref="website-title-wrapper">
        <router-link class="plain" to="/">蜂鸟博客</router-link>
    </div>
    <transition
        :css="false"
        @enter="enter"
        @leave="leave"
    >
        <div v-if="state === 'normal'" key="buttons" class="title-aux buttons">
            <el-dropdown v-if="hasLogin">
                <span class="el-dropdown-link">
                    账号<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="$router.push('/articles/new')">新建文章</el-dropdown-item>
                    <el-dropdown-item @click="$router.push('/account/')">修改账号密码</el-dropdown-item>
                    <el-dropdown-item @click="logout()">登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button v-else type="text" @click.stop="$router.push('/login')">登录</el-button>

            <el-button @click="showSearchBox()" type="text">搜索</el-button>
        </div>
        <form v-else-if="state === 'search'" key="searchbox" class="title-aux searchbox" ref="searchbox">
            <input type="text" placeholder="搜索文章" v-model="searchText" :style="searchBoxStyle" @keydown.enter="search"/>

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
import { Message, Button, Dropdown, DropdownItem, DropdownMenu } from 'element-ui';
import { mapState } from 'vuex';

export default {
    name: 'WebsiteTitle',

    mounted () {
        this.elWidth = this.$el.offsetWidth;
    },

    data () {
        return {
            state: 'normal',
            searchText: '',
            elWidth: null
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
                Message('搜索前，请先在搜索框中输入内容。');
            } else {
                this.$router.push(`/search/?s=${encodeURIComponent(this.searchText)}`);
            }
        },

        logout () {
            this.$store.dispatch('app/logout');
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
        },

        ...mapState({
            hasLogin: state => state.app.hasLogin
        })
    },

    components: {
        'el-button': Button,
        'el-dropdown': Dropdown,
        'el-dropdown-menu': DropdownMenu,
        'el-dropdown-item': DropdownItem
    }
}
</script>

<style scoped>
.website-title {
    width: 100%;
    padding: 1rem 0 0.5rem;
    border-bottom: 1px solid#D4D4D4;
    transition: font-size 0.5s, opacity 0.5s;
    position: relative;
}

.website-title > .heading {
    width: 4em;
    margin: 0 auto;
    white-space: nowrap;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
}

.title-aux {
    position: absolute;
    display: flex;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
}

.title-aux.buttons > * {
    margin-left: 1em;
}

/** HACK */
.title-aux.buttons > .el-button,
.title-aux.buttons > .el-dropdown {
    padding: 0;
}

.title-aux.buttons .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    vertical-align: middle;
}

.title-aux.buttons .el-icon-arrow-down {
    font-size: 12px;
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
