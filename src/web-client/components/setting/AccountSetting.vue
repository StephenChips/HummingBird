<template>
<div>
    <h1>修改密码</h1>
    <el-card shadow="never">
        <el-form class="form-password" status-icon :model="form" :rules="rules" label-width="120px" ref="form">
            <el-form-item label="输入旧密码" prop="oldPassword">
                <el-input v-model="form.oldPassword" show-password/>
            </el-form-item>
            <el-form-item label="输入新密码" prop="newPassword">
                <el-input v-model="form.newPassword" show-password/>
            </el-form-item>
            <el-form-item label="再次输入新密码" prop="confirmedPassword">
                <el-input v-model="form.confirmedPassword" show-password/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<script>
import { Card, Input, Form, FormItem, Button, Message } from 'element-ui';
import { SettingPages } from '../../src/store/settingPage';

import request from '../../src/request';

export default {
    created () {
        this.$store.commit('settingPage/setActivedPage', { activedPage: SettingPages.ACCOUNT_CHANGE_PASSWORD });
    },

    data () {
        var vm = this;
        return {
            form: {
                oldPassword: '',
                newPassword: '',
                confirmedPassword: ''
            },
            rules: {
                oldPassword: {
                    trigger: 'blur',

                    validator (rule, value, callback) {
                        console.log(vm)
                        if (vm.form.oldPassword === '') {
                            callback(new Error('请输入旧密码'));
                        } else {
                            callback();
                        }
                    }
                },

                newPassword: {
                    trigger: 'blur',

                    validator (rule, value, callback) {
                        if (vm.form.newPassword === '') {
                            callback(new Error('请输入密码'));
                            return;
                        }

                        vm.$refs['form'].validateField('confirmedPassword');

                        if (!checkPassword(vm.form.newPassword)) {
                            callback(new Error('密码长度应该大于8位，且需包含英文字母'));
                        } else {
                            callback();
                        }
                    }
                },

                confirmedPassword: {
                    trigger: 'blur',

                    validator (rule, value, callback) {
                        if (vm.form.oldPassword === '') {
                            callback(new Error('请再次输入密码'));
                        } else if (vm.form.newPassword !== vm.form.confirmedPassword) {
                            callback(new Error('两次输入密码不一致'))
                        } else {
                            callback();
                        }
                    }
                }
            }
        };

        function checkPassword (password) {
            return password.length >= 8 && Array.prototype.some.call(password, isAlpha);

            function isAlpha (ch) {
                return ch >= 'A' && ch <= 'Z' || ch >= 'a' && ch <= 'z';
            }
        }
    },

    methods: {
        submit () {
            request.updatePassword(this.form.newPassword)
                .then(() => {
                    Message.success('更新成功！');
                }).catch(() => {
                    Message.error('更新失败！');
                });
        }
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
