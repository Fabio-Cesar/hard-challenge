// Lógica para invocar o roteamento do SPA.

import { AboutView } from './views/about.js';
import { AddCharacterView } from './views/addcharacter.js';
import { AddPackageView } from './views/addpackage.js';
import { CollectionView } from './views/collection.js';
import { HomeView } from './views/home.js';
import { LandingView } from './views/landing.js';
import { LoginView } from './views/login.js';
import { NotFoundView } from './views/notFound.js';
import { PendingTradeView } from './views/pendingtrade.js';
import { ProfileView } from './views/profile.js';
import { SignupView } from './views/signup.js';
import { TradeView } from './views/trade.js';
import { navigateTo } from './methods.js';

const log = document.querySelector('#log');

const routes = {
    '404': NotFoundView,
    '/': LandingView,
    '/login': LoginView,
    '/signup': SignupView,
    '/about': AboutView,
    '/home': HomeView,
    '/profile': ProfileView,
    '/collection': CollectionView,
    '/trade': TradeView,
    '/pendingtrade': PendingTradeView,
    '/addpackage': AddPackageView,
    '/addcharacter': AddCharacterView
};

export async function router() {
    const headers = document.querySelectorAll('header');
    for ( let i = 0; i < headers.length; i++ ) {
        headers[i].style.display = "none";
    };
    const mains = document.querySelectorAll('main');
    for ( let i = 0; i < mains.length; i++ ) {
        mains[i].style.display = "none";
    };
    document.querySelector('#profile-container').style.display = "none";
    let path = window.location.pathname;
    switch (path) {
        case '/':
        case '/login':
        case '/signup':
            document.querySelector('#unauthenticated-header').style.display = "flex";
            break;
        case '/home':
            const packageContainer = document.querySelector('#shop-packages');
            packageContainer.innerHTML = '';
            const homeResponse = await fetch('api/packages');
            if (homeResponse.status !== 200) {
                log.innerText = 'Erro na requisição';
            } else {
                const packageRes = await homeResponse.json();
                let commonchance;
                let rarechance;
                for (let i = 0; i < packageRes.packages.length; i++) {
                    commonchance = 100 - packageRes.packages[i].chance_rare;
                    rarechance = packageRes.packages[i].chance_rare - packageRes.packages[i].chance_ultrarare;
                    packageContainer.innerHTML += `<div class="container-packages">
                    <img src="./images/packages/${packageRes.packages[i].id}.jpg" alt="Pacote disney ${packageRes.packages[i].type}" class="packages">
                    <div class="box-shop">
                        <p><img src="/images/coin-svgrepo-com.svg" id="coins-img" />${packageRes.packages[i].price}</p>
                        <p>Pacote ${packageRes.packages[i].brand}</p>
                        <p>${packageRes.packages[i].type}</p>
                        <p class="package-chances">CHANCE COMUM ${commonchance}%</p>
                        <p class="package-chances">CHANCE RARO ${rarechance}%</p>
                        <p class="package-chances">CHANCE ULTRARARO ${packageRes.packages[i].chance_ultrarare}%</p>
                        <button class="btn-shop" id="${packageRes.packages[i].id} data-value="${packageRes.packages[i].price}" data-buyPackagePost>Comprar</button>
                    </div>
                </div>`
                };
            }
        case '/profile':
        case '/collection':
        case '/trade':
        case '/pendingtrade':
            const response = await fetch('api/user');
            if (response.status !== 200) {
                console.log('Não autenticado!');
                path = '/';
                navigateTo(path);
            } else {
                document.querySelector('#authenticated-user-header').style.display = "flex";
                document.querySelector('#profile-container').style.display = "flex";
            }
            break;
        case '/addpackage':
        case '/addcharacter':
            const res = await fetch('api/admin');
            if (res.status !== 200) {
                console.log('Não autorizado!');
                path = '/';
                navigateTo(path);
            } else {
                document.querySelector('#authenticated-admin-header').style.display = "flex";
                document.querySelector('#profile-container').style.display = "flex";
            };
            break;
        default:
    }
    const view = new routes[path] || new routes['404'];
};

window.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener("click", async (e) => {
        if (e.target.matches("[data-loginPost]")) {
            console.log('chamou');
            e.preventDefault();
            const emailValue = document.querySelector('#login-input-email').value;
            const passwordValue = document.querySelector('#login-input-password').value;
            console.log(emailValue, passwordValue);
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
                // console.log(data);
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
            const emailValue = document.querySelector('#signup-input-email').value;
            const passwordValue = document.querySelector('#signup-input-password').value;
            const repeatPasswordValue = document.querySelector('#signup-input-new-password').value;
            const userNameValue = document.querySelector('#signup-input-user').value;
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
            const response = await fetch('api/signup', options);
            navigateTo('/login');
        };
    });
    router();
});

window.addEventListener('popstate', router);

document.querySelector('#back-btn').addEventListener('click', () => {
    window.history.back();
});

const modal = document.querySelector('.modal')

const btnCloseModal = document.querySelector('#icon-close-modal');
btnCloseModal.addEventListener('click', closeModal)

function closeModal(){
    modal.style.display = 'none';
}