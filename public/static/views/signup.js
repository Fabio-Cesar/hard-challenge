import View from './view.js';

export class SignupView extends View {
    
    constructor() {
        super();
        this.display = "#signup-page";
    };

    async getData() {
        try {
            document.querySelector('#signup-input-email').value = '';
            document.querySelector('#signup-input-password').value = '';
            document.querySelector('#signup-input-user').value = '';
        } catch (error) {
            console.log(error)
        }
    }
};