import View from './view.js';

export class LoginView extends View {

    constructor() {
        super();
    };

    async getHTML() {
        return `<form action="/login" method="post"><input type="text" name="email" id="email-login-input" /><input type="text" name="password" id="password-login-input" /><button type="button"><a href="/home" data-loginPost>Entrar</a></button></form>`;
    };
};
