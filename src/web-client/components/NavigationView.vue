<template>
<div>
    <div class="nav-wrapper" v-if="sectionLinks !== null">
        <div class="nav">
            <div class="nav-title">
                蜂鸟博客
            </div>
            <!-- 在导航栏上只显示三个Section的链接 -->
            <router-link to="/" :class="{
                    link: true,
                    plain: true,
                    selected: currentPage && currentPage === 'home'
                }">
                主页
            </router-link>
            <router-link
                v-for="link of sectionLinks.slice(0, 3)"
                :key="link.sectionID"
                href="#"
                :to="link.url"
                :class="{
                    link: true,
                    plain: true,
                    selected: currentPage && currentPage === link.sectionID
                }">
                {{ link.sectionName }}
            </router-link>

            <!-- 如果有更多的Section，把他们收进下拉菜单中 -->
            <!-- 
                这里增加一个包裹的DIV的原因，是让下拉菜单的开启按钮位于中间，且高度不占满整个导航条，以防止下拉菜单定位离启按钮太远。如下图：

                =========================
                  |  +---------+  |
                  |  |  Button |  |  导航条区域        √   （注意：内部Button的边框是隐藏的）
                  |  +---------+  |
                =========================

                ===========================
                   |              |
                   |    Button    |   导航条区域       ×
                   |              |
                ===========================
            -->
            <div style="display: flex; align-items: center;" v-if="sectionLinks.length > 3">
                <el-dropdown class="link plain">
                    <span class="el-dropdown-link">
                        <a class="link plain" href="javascript:;">更多<i class="el-icon-arrow-down el-icon--right"></i></a>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-for="link of sectionLinks.slice(3)"
                            :key="link.sectionID">
                            {{ link.sectionName }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

        </div>
    </div>
    <router-view class="main-content"/>
    <footer>
        <span>蜂鸟博客 {{currentYear}}</span>
        <el-divider direction="vertical"></el-divider>
        <a style="color: inherit;" href="https://github.com/StephenChips">Github</a>
        <router-link style="color: inherit;" to="/login">登录</router-link>
    </footer>
</div>
</template>

<script>
import Input from 'element-ui/lib/input';
import Divider from 'element-ui/lib/divider';
import Button from 'element-ui/lib/button';
import Dropdown from 'element-ui/lib/dropdown';
import DropdownMenu from 'element-ui/lib/dropdown-menu';
import DropdownItem from 'element-ui/lib/dropdown-item';

import request from '../src/request';

export default {

    data: function () {
        return {
            currentYear: new Date().getFullYear(),

            currentPage: null,

            sectionLinks: null,
        };
    },

    async created () {
        var articleSections = await request.getAllSections();
        this.sectionLinks = articleSections.map(section => ({
            url: '/' + section.sectionID,
            sectionName: section.sectionName,
            sectionID: section.sectionID
        }));

        console.log(this.sectionLinks)
        this.decideCurrentSectionID(this.$route);
    },

    beforeRouteUpdate (to, from, next) {
        this.decideCurrentSectionID(to);
        next();
    },

    methods: {
        decideCurrentSectionID (route) {
            if (route.path === '/' || route.path === '/home') {
                this.currentPage = 'home';
            } else if (typeof route.params.sectionID === 'string') {
                console.log(route)
                this.currentPage = route.params.sectionID;
            } else {
                this.currentPage = '';
            }

            console.log(this.currentPage)
        }
    },

    components: {
        'el-input': Input,
        'el-divider': Divider,
        'el-button': Button,
        'el-dropdown': Dropdown,
        'el-dropdown-menu': DropdownMenu,
        'el-dropdown-item': DropdownItem,
        'el-divider': Divider
    }
}
</script>

<style scoped>
.main-content {
    margin-top: 150px;
}

.nav-wrapper {
    background: white;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 1000;
}

.nav {
    display: flex;
    padding: 0 16px;
    width: 980px;
    height: 80px;
    margin: 0 auto;
    background: white;
    border-bottom: 1px solid #DCDFE6;
}

.nav.no-shadow {
    box-shadow: none;
}

.nav .nav-title {
    display: flex;
    align-items: center;
    font-size: 32px;
    letter-spacing: 0.1em;

    /**
     * [Firefox Bug] Firefox doesn't correctly calculate the width after applying `letter-spacing`,
     * causing the text folds.
     */
    width: 5em;
    color: #409EFF;
    margin-right: auto;
}

.nav .link {
    display: flex;
    align-items: center;
    color: #409EFF;
    font-size: 18px;
    margin-right: 2em;
}
.nav .link.selected {
    position: relative;
    font-weight: bold;
}

.nav .link.selected::after {
    content: ' ';
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% + 5px);
    height: 3px;
    transform: translateX(-2.5px);
    background: #409EFF;
}

.nav .link:last-child {
    margin-right: 0;
}

.nav >>> .el-input {
    font-size: 16px;
    width: 15em;
}

footer {
    margin-top: 32px;
    text-align: center;
    color: #909399; 
}

footer .link {
    color: #409EFF;
}

</style>
