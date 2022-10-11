import View from './view.js';

export class LoginView extends View {

    constructor() {
        super();
        this.display = "#login-page";
    };
    
    async getData() {
        try {
            document.querySelector('#login-input-email').value = '';
            document.querySelector('#login-input-password').value = '';
        } catch (error) {
            console.log(error)
        }
    }
};
