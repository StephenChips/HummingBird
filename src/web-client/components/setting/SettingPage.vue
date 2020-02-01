<template>
<div>
    <header>
        <el-page-header @back="back" content="设置" />
    </header>
    <main>
        <el-menu :router="true">
            <el-menu-item index="/settings/account">修改密码</el-menu-item>
        </el-menu>
        <div class="content">
            <router-view />
        </div>
    </main>
</div>
</template>

<script>
import { PageHeader, Menu, MenuItem } from 'element-ui';
export default {
    methods: {
        back () {
            console.log('click back button');
        }
    },

    components: {
        'el-page-header': PageHeader,
        'el-menu': Menu,
        'el-menu-item': MenuItem
    }
}
</script>

<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 4rem;
    width: 100vw;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #DCDFE6;
    background: white;
}
main {
    display: flex;
    align-items: stretch;
    width: 75%;
    min-width: 980px;
    margin: 6rem auto 0;
}

main .content {
    margin-left: 10rem;
    flex: 1;
}
</style>
