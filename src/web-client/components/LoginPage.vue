
<template>
<main>
    <h1 class="page-title">
        蜂鸟博客
    </h1>
    <div class="login-hint">
        <transition name="fade" mode="out-in">
            <div key="hint-login" v-if="state === LoginState.LOGIN" class="login-hint__hint">
                请登录
            </div>
            <div key="hint-success" v-else-if="state === LoginState.SUCCESS" class="login-hint__hint">
                登录成功
            </div>
            <div key="hint-user-not-exists" v-else-if="state === LoginState.USER_NOT_EXISTS" class="login-hint__hint">
                账号不存在
            </div>
            <div key="hint-password-incorrect" v-else-if="state === LoginState.PASSWORD_INCORRECT" class="login-hint__hint">
                密码错误
            </div>
        </transition>
    </div>
    <form class="login-form" @submit.prevent="login">
        <div class="form-section">
            <div class="form-input username" :class="formInputClass.username">
                <label for="form-input-username">用户名</label>
                <input type="text" :value="username" @input="handleInput('username', $event)" required>
                <div class="incorrect-prompt">账号不存在</div>
            </div>
        </div>
        <div class="form-section">
            <div class="form-input password" :class="formInputClass.password">
                <label for="form-input-password">密码</label>
                <input type="password" :value="password" @input="handleInput('password', $event)" required>
                <div class="incorrect-prompt">密码错误</div>
            </div>
        </div>
        <div class="form-section">
            <div class="form-submit">
                <button id="submit" type="submit" class="form-button-confirm" title="确认登录信息并登录">确认</button>
                <button id="cancel" type="button" class="form-button-cancel" title="返回上一页" @click.stop="$router.go(-1)">返回</button>
            </div>
        </div>
    </form>
    <small class="sys-info" v-if="isSysInfoVisible">
        <div>由蜂鸟博客系统搭建</div>
        <div>Powered By Hummingbird Blog System</div>
    </small>
</main>
</template>

<script>
import throttle from 'lodash/throttle';
import { LoginState as AuthLoginState } from "../src/auth";

const LoginState = Object.freeze({
    LOGIN: 'LOGIN',
    ...AuthLoginState
});

export default {
    name: 'LoginPage',

    created () {
        var vm = this;
        window.onresize = throttle(function setVisible () {
            if (vm.shouldShowSysInfo()) {
                vm.isSysInfoVisible = true;
            } else {
                vm.isSysInfoVisible = false;
            }
        }, 200);
    },

    beforeRouteEnter (to, from, next) {
        console.log(to, from);
        next();
    },

    data () {
        return {
            LoginState: LoginState,
            state: LoginState.LOGIN,
            isSysInfoVisible: this.shouldShowSysInfo(),

            username: '',
            password: '',

            formInputClass: {
                username: '',
                password: ''
            }
        }
    },

    methods: {
        login () {
            var promise = this.$store.dispatch('app/login', {
                username: this.username,
                password: this.password
            })

            promise.then(() => {
                this.state = LoginState.SUCCESS;

                window.setTimeout(() => {
                    console.log(this.$router)
                    this.$router.go(-1);
                }, 1000);
            }).catch(err => {
                var state = err.message;
                this.state = state;
                if (state === LoginState.USER_NOT_EXISTS) {
                    this.formInputClass.username = 'incorrect';
                }
                if (state === LoginState.PASSWORD_INCORRECT) {
                    this.formInputClass.password = 'incorrect';
                }
            });
        },

        shouldShowSysInfo () {
            return window.innerHeight > 800;
        },

        handleInput (fieldName, event) {
            if (this.formInputClass.username !== '' || this.formInputClass.password !== '') {
                this.formInputClass.username = '';
                this.formInputClass.password = '';
            }

            this[fieldName] = event.target.value;

            console.log(this.username, this.password);
        }
    },
}
</script>

<style scoped>
main {
    width: 550px;
    margin: 0 auto;
    margin-top: 200px;
    position: relative;
}

.page-title {
    border-top: 1px solid #D4D4D4;
    border-bottom: 1px solid #D4D4D4;
    padding: 0.25em;
    margin: 0;
    width: 100%;

    box-sizing: border-box;
    text-align: center;

    font-family: 'STSong', 'NSimSun', 'SimSun', serif;
    font-weight: normal;
    font-size: 3em;
    font-weight: bold;
    letter-spacing: 0.25em;
}

.login-form {
    width: 80%;
    margin: 0 auto;
}

.form-section {
    margin-bottom: 1.5em;
    font-size: inherit;
}

.form-section.password {
    margin-bottom: 4rem;
}

.form-section > .form-input {
    width: 100%;
}

.form-input {
    margin-bottom: 1em;
}

.form-input label {
    display: block;
    font-size: 14px;
}

.form-input input {
    display: block;
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid #AEAEAE;
    line-height: 2;
    padding: 0;
    font-size: inherit;
}

.form-input .incorrect-prompt {
    opacity: 0;
    display: block;
    font-size: 14px;
}


.form-input.incorrect label {
    color: #960000;
    transition: color 0.5s;
}

.form-input.incorrect input {
    border-bottom-color: #960000;
    transition: border 0.5s;
}

.form-input.incorrect .incorrect-prompt {
    opacity: 1;
    color: #960000;
    transition: opacity 0.5s;
}

.form-section > .form-submit {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.form-section > .form-submit > button {
    box-sizing: border-box;
    font-size: 1em;
    background: none;
    border: none;
    cursor: pointer;
    flex: 0;
    flex-basis: 48%;
    height: 2.5em;
}

.form-section > .form-submit > .form-button-confirm {
    background: #232323;
    color: white;
}

.form-section > .form-submit > .form-button-cancel {
    border: 1px solid #232323;
}

.sys-info {
    display: block;
    position: fixed;
    bottom: 1em;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: calc(1rem - 2px);
    text-align: center;

    color: #AEAEAE;
}

.login-hint {
    display: block;
    text-align: center;
    font-family: 'STSong', 'NSimSun', 'SimSun', serif;
    font-weight: normal;
    font-size: 1.75em;
    width: 8em;
    margin: 4em auto 0.5em;
}

.fade-enter {
    opacity: 0;
    transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s, transform 0.25s;
}

.fade-enter-to,
.fade-leave {
    opacity: 1;
    transform: translateX(0);
}

.fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

</style>
