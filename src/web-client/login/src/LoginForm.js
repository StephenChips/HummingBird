
import { EventEmitter } from 'events';

/**
 * Responsibility
 *
 * 1. get password from element
 * 2. get user name from element
 * 3. set password element invalid with some prompt
 * 4. set user name invalid with some prompt
 * 5. emit change event once changed
 */

export class Form extends EventEmitter {
    constructor (root) {
        super();
        this.$root = root;

        this.$inputUsername = this.$root.querySelector('.form-input.username');
        this.$inputPassword = this.$root.querySelector('.form-input.password');

        this.$inputUsername.classList.remove('incorrect');
        this.$inputPassword.classList.remove('incorrect');

        this.isFieldCorrect = new Map();

        this.$inputUsername.addEventListener('input', () => {
            this.emit('username');
        });

        this.$inputPassword.addEventListener('input', () => {
            this.emit('password');
        });
    }

    getIncorrectPrompt ($formInput) {
        return $formInput.getElementsByClassName('incorrect-prompt')[0];
    }

    setPasswordIncorrect (prompt) {
        this._setFieldIncorrect(this.$inputPassword, prompt);
    }

    setUserNameIncorrect (prompt) {
        this._setFieldIncorrect(this.$inputUsername, prompt);
    }

    setUserNameCorrect () {
        this._setFieldCorrect(this.$inputUsername);
    }

    setPasswordCorrect () {
        this._setFieldCorrect(this.$inputPassword);
    }

    _setFieldIncorrect (field, prompt) {
        if (this.isFieldCorrect.get(field)) {
            field.classList.add('incorrect');
            this.getIncorrectPrompt(field).textContent = prompt;
            this.isFieldCorrect.set(field, false);
        }
    }

    _setFieldCorrect (field) {
        if (!this.isFieldCorrect.get(field)) {
            field.classList.remove('incorrect');
            this.getIncorrectPrompt(field).textContent = '';
            this.isFieldCorrect.set(field, true);
        }
    }

    get username () {
        return this.$inputUsername.getElementsByTagName('input')[0].value;
    }

    get password () {
        return this.$inputPassword.getElementsByTagName('input')[0].value;
    }
}
