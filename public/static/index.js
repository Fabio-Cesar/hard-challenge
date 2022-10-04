// Lógica para invocar o roteamento do SPA.

import { homeView, landingView, loginView, notFoundView, signinView } from './views.js';
import { navigateTo } from './methods.js';

const app = document.querySelector('#app');

console.log(window.location.pathname);

const routes = {
    '404': notFoundView,

    '/': landingView,

    '/login': loginView,

    '/signin': signinView,

    '/home': homeView
};

export async function router() {
    let path = window.location.pathname;
    // try authentication for paths that require it
    switch (path) {
        case '/home':
            const options = {
                method: "POST",
                headers: {
                    "credentials": "include"
                }
            };
            const response = await fetch('http://localhost:8080/home', options);
            if (response.status !== 200) {
                console.log('Não autenticado!');
                path = '/';
                navigateTo(path);
            };
            break;
        default:
    }
    const view = routes[path] || routes['404'];
    app.innerHTML = await view().getHTML();
};

window.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener("click", async (e) => {
        // adquirir o token
        if (e.target.matches("[data-loginPost]")) {
            e.preventDefault();
            const emailValue = document.querySelector('#email-login-input').value;
            console.log(emailValue);
            const passwordValue = document.querySelector('#password-login-input').value;
            const bodyValue = {
                email: emailValue,
                password: passwordValue
            }
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "credentials": "include"
                },
                body: JSON.stringify(bodyValue)                
            };
            const response = await fetch('http://localhost:8080/login', options);
            if (response.status !== 200) {
                const data = await response.json();
                console.log(data.message);
                navigateTo('/');
            } else {
                navigateTo('/home');
            }
        }
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});

window.addEventListener('popstate', router);