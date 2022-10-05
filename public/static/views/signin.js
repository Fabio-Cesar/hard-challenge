import View from './view.js';

export class SigninView extends View {
    
    constructor() {
        super();
    };

    async getHTML() {
        return `<form action="/signin" method="post"><input type="text" name="email" id="email-signin-input" /><input type="text" name="user" id="user-signin-input" /><input type="text" name="password" id="password-signin-input" /><input type="text" name="passwordtwo" id="passwordtwo-signin-input" /><buton type="button"><a href="/login" data-link>Cadastrar</a></button></form>`;
    };
};