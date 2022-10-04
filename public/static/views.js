// Nessa camada, cria-se o Template HTML para cada página, importando os componentes que ela utiliza (como botões, cards, pactotes, etc) dos arquivos em Components. Também vincula aos componentes datasets (data-****) relativos a sua função na alteração da estrutura da página, bem como qualquer id ou class necessário para a sua aquisição e utilização na página.

export function notFoundView() {

    async function getHTML() {
        return `<p>Not Found</p>`
    };

    return {getHTML};
};

export function landingView() {
    
    async function getHTML() {
        return `<nav><button type="button"><a href="/login" data-link>Login</a></button><button type="button"><a href="/signin" data-link>Cadastro</a></button></nav>`
    };
    
    return {getHTML};
};

export function loginView() {

    async function getHTML() {
        return `<form action="/login" method="post"><input type="text" name="email" id="email-login-input" /><input type="text" name="password" id="password-login-input" /><button type="button"><a href="/home" data-loginPost>Entrar</a></button></form>`
    }

    return {getHTML};
};

export function signinView() {

    async function getHTML() {
        return `<form action="/signin" method="post"><input type="text" name="email" id="email-signin-input" /><input type="text" name="user" id="user-signin-input" /><input type="text" name="password" id="password-signin-input" /><input type="text" name="passwordtwo" id="passwordtwo-signin-input" /><buton type="button"><a href="/login" data-link>Cadastrar</a></button></form>`
    }

    return {getHTML};
};

export function homeView() {

    async function getHTML() {
        return `<p>Hello</p><form action="/logout" method="post"><button type="button"><a href="/login" data-link>Sair</a></button></form>`
    };

    return {getHTML};
};