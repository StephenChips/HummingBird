import { Form } from './LoginForm';
import { Carousel } from './Carousel';
import { Visibility } from './Visibility';

import '../stylesheets/main.css'

class Page {
    constructor () {
        this.state = {
            isPoweredByVisible: true
        };

        this.loginForm = new Form(document.getElementById('login-form'));

        this.submit = document.getElementById('submit');
        this.cancel = document.getElementById('cancel');

        this.loginHint = new Carousel(document.getElementById('login-hint'));
        this.poweredBy = new Visibility(document.getElementById('powered-by'));

       this._initEvents();

       this._updatePoweredByVisibility();
    }

    _updatePoweredByVisibility () {
        if (window.innerHeight < 800) {
            this.poweredBy.hide();
        } else {
            this.poweredBy.show();
        }
    }

    _initEvents () {
        window.addEventListener('resize', () => {
            this._updatePoweredByVisibility();
        });

        this.loginForm.on('password', () => {
            if (this.loginForm.password == '') {
                this.loginForm.setPasswordIncorrect('密码不能为空');
            } else {
                this.loginForm.setPasswordCorrect();
            }
        });

        this.loginForm.on('username', () => {
            if (this.loginForm.username == '') {
                this.loginForm.setUserNameIncorrect('用户名不能为空');
            } else {
                this.loginForm.setUserNameCorrect();
            }
        });

        this.submit.addEventListener('click', () => {
            this.loginHint.next();
        });
    }
}

new Page();
