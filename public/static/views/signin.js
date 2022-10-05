import View from './view.js';

export class SigninView extends View {
    
    constructor() {
        super();
        this.cssHref = "./css/signin.css";
    };

    async getHTML() {
        return `<header class="flex">
        <div id="header-container" class="flex">
            <a href="/" id="menu-home" data-link>
                <h1>cardCreator</h1>
            </a>
            <nav>
                <ul>
                    <li><a href="/login" id="menu-enter" data-link>Entrar</a></li>
                    <li><div id="menu-register">Cadastre-se</div></li>
                    <li><a href="/about" id="menu-about" data-link>Sobre</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main>
        <div id="container-register" class="flex">
            <h2>CADASTRAR</h2>
            <form id="form-register">
                <label for="signin-input-email">E-mail</label>
                <input type="text" id="signin-input-email">
                <label for="signin-input-password">Senha</label>
                <input type="text" id="signin-input-password">
                <label for="signin-input-new-password">Repita a Senha</label>
                <input type="text" id="signin-input-new-password">
                <label for="signin-input-user">Usuário</label>
                <input type="text" id="signin-input-user">
            </form>
            <div>
                <a href="/login" data-link>
                    <p>Já possui usuário ?</p>
                    <p>Entre aqui.</p>
                </a>
            </div>
            <button id="btn" data-signinPost>Cadastrar</button>
        </div>
    </main>`
    };
};



// `<form action="/signin" method="post"><input type="text" name="email" id="email-signin-input" /><input type="text" name="user" id="user-signin-input" /><input type="text" name="password" id="password-signin-input" /><input type="text" name="passwordtwo" id="passwordtwo-signin-input" /><buton type="button"><a href="/login" data-link>Cadastrar</a></button></form>`;