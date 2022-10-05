// Lógica para invocar o roteamento do SPA.

import { AboutView } from './views/about.js';
import { HomeView } from './views/home.js';
import { LandingView } from './views/landing.js';
import { LoginView } from './views/login.js';
import { NotFoundView } from './views/notFound.js';
import { SigninView } from './views/signin.js';
import { navigateTo } from './methods.js';

const app = document.querySelector('#app');
const log = document.querySelector('#log');

const routes = {
    '404': NotFoundView,

    '/': LandingView,

    '/login': LoginView,

    '/signin': SigninView,

    '/home': HomeView,

    '/about': AboutView
};

export async function router() {
    let path = window.location.pathname;
    switch (path) {
        case '/home':
            const options = { method: "GET" };
            const response = await fetch('api/home', options);
            if (response.status !== 200) {
                console.log('Não autenticado!');
                path = '/';
                navigateTo(path);
            };
            break;
        default:
    }
    const view = new routes[path] || new routes['404'];
    app.innerHTML = await view.getHTML();
};

window.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener("click", async (e) => {
        if (e.target.matches("[data-loginPost]")) {
            e.preventDefault();
            const emailValue = document.querySelector('#email-login-input').value;
            const passwordValue = document.querySelector('#password-login-input').value;
            const bodyValue = {
                email: emailValue,
                password: passwordValue
            }
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyValue)                
            };
            const response = await fetch('api/login', options);
            if (response.status !== 200) {
                const data = await response.json();
                navigateTo('/');
            } else {
                navigateTo('/home');
            }
        };
        if (e.target.matches("[data-logoutPost]")) {
            e.preventDefault();
            const options = { method: "POST" };
            const response = await fetch('api/logout', options);
            navigateTo('/login');
        };
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        };
        if (e.target.matches("[data-signinPost]")) {
            e.preventDefault();
            const emailValue = document.querySelector('#signin-input-email').value;
            const passwordValue = document.querySelector('#signin-input-password').value;
            const repeatPasswordValue = document.querySelector('#signin-input-new-password').value;
            const userNameValue = document.querySelector('#signin-input-user').value;
            const bodyValue = {
                email: emailValue,
                password: passwordValue,
                name: userNameValue
            }
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyValue)                
            };
            const response = await fetch('api/signin', options);
            navigateTo('/login');
        };
    });
    router();
});

window.addEventListener('popstate', router);