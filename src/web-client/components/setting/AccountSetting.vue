<template>
<div>
    <h1>修改密码</h1>
    <el-card shadow="hover">
        <el-form class="form-password" :model="form" label-width="120px">
            <el-form-item label="输入旧密码">
                <el-input v-model="form.oldPassword" show-password/>
            </el-form-item>
            <el-form-item label="输入新密码">
                <el-input v-model="form.newPassword" show-password/>
            </el-form-item>
            <el-form-item label="再次输入新密码">
                <el-input v-model="form.confirmedPassword" show-password/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<script>
import { Card, Input, Form, FormItem, Button } from 'element-ui';
export default {
    data () {
        return {
            form: {
                oldPassword: '',
                newPassword: '',
                confirmedPassword: ''
            }
        };
    },
    components: {
        'el-input': Input,
        'el-card': Card,
        'el-form': Form,
        'el-form-item': FormItem,
        'el-button': Button
    }
}
</script>

<style scoped>
.el-card {
    width: 100%;
}

.form-password {
    width: 60%;
}

h1 {
    margin: 0;
    margin-bottom: 2rem;
}
</style>
