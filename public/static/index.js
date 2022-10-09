// Lógica para invocar o roteamento do SPA.

import { AdminProfileView } from "./views/adminprofile.js";
import { AddBrandView } from './views/addbrand.js';
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
import { buyCard, closeModals, createBrand, createCharacter, createPackage, getChangeRequests, linkClick, login, logout, navigateTo, signup, updateAdminProfile, updateUserProfile, openErrorModal, finishChangeRequest } from './methods.js';

const routes = {
    '404': NotFoundView,
    '/': LandingView,
    '/login': LoginView,
    '/signup': SignupView,
    '/home': HomeView,
    '/profile': ProfileView,
    '/collection': CollectionView,
    '/trade': TradeView,
    '/pendingtrade': PendingTradeView,
    '/addpackage': AddPackageView,
    '/addcharacter': AddCharacterView,
    '/addbrand': AddBrandView,
    '/adminprofile': AdminProfileView
};

const defaultHeader = document.querySelector('#unauthenticated-header');

const userHeader = document.querySelector('#authenticated-user-header');
const userProfile = document.querySelector('#profile-container');
export const userName = document.querySelector('#profile-user-name');
export const profileImg = document.querySelector('#profile-img');
export const userCoins = document.querySelector('#profile-user-coins');

const adminHeader = document.querySelector('#authenticated-admin-header');
const adminProfile = document.querySelector('#profile-admin-container');
export const adminName = document.querySelector('#profile-admin-name');
export const adminProfileImg = document.querySelector('#profile-admin-img');

const backBtn404 = document.querySelector('#back-btn');

export async function router() {
    const headers = document.querySelectorAll('header');
    for ( let i = 0; i < headers.length; i++ ) {
        headers[i].style.display = "none";
    };
    const mains = document.querySelectorAll('main');
    for ( let i = 0; i < mains.length; i++ ) {
        mains[i].style.display = "none";
    };
    userProfile.style.display = "none";
    adminProfile.style.display = "none";

    let path = window.location.pathname;

    if (path == '/' || path == '/login' || path == '/signup' ) {
        defaultHeader.style.display = "flex";
        const view = new routes[path];
        const viewData = await view.getData();
    }
    
    else if (path == '/home' || path == '/profile' || path == '/collection' || path == "/trade" || path == "/pendingtrade") {
        try {
            const response = await fetch('api/user');
            if (response.status !== 200) {
                const error = await response.json();
                throw new Error(`${error.message}`);
            }
            const data = await response.json();
            userHeader.style.display = "flex";
            userProfile.style.display = "flex";
            userName.innerText = `${data.userName}`;
            profileImg.src = `./images/uploads/${data.userID}.png`
            userCoins.innerText = `${data.userCoins}`;
            const view = new routes[path];
            const viewData = await view.getData();
        } catch (error) {
            openErrorModal(`${error.message}`);
            navigateTo('/');
        }
    }

    else if (path == '/addpackage' || path == '/addcharacter' || path == '/addbrand' || path == '/adminprofile') {
        try {
            const res = await fetch('api/admin');
            if (res.status !== 200) {
                const error = await res.json();
                throw new Error(`${error.message}`);
            }
            const data = await res.json();
            adminHeader.style.display = "flex";
            adminProfile.style.display = "flex";
            adminName.innerText = `${data.userName}`;
            adminProfileImg.src = `./images/uploads/${data.userID}.png`
            const view = new routes[path];
            const viewData = await view.getData();
        } catch (error) {
            openErrorModal(`${error.message}`);
            navigateTo('/home');
        }
    }
    
    else {
        path = '404';
        const view = new routes[path];
        const viewData = await view.getData();
    };

    switch (path) {
        case '/collection':
            try {
                fetch('api/cards')
                .then((res) => res.json())
                .then((data) => addCards(data.cards))
                
                const myCollection = document.querySelector('#my-collection');
                myCollection.innerHTML = '';
                // CRIANDO OS CARDS DINAMICAMENTE
                function addCards(cards){
                    console.log(cards);
                    for(let i = 0; i<cards.length; i++){
                        const containerImg = document.createElement('div');
                        const img = document.createElement('img');
                        const name = document.createElement('p');
                        const rarely = document.createElement('p');
                        const divToggle = document.createElement('div');
                        const inputToggle = document.createElement('input')
                        const checked = document.createElement('label')

                        containerImg.className = 'container-card-collection';
                        img.src = `../images/characters/${cards[i].charactername}.png`;
                        img.className = 'img-my-collection';
                        name.className = 'name-card-collection';
                        name.innerHTML = cards[i].charactername;
                        rarely.className = 'rarely-card-collection';
                        rarely.innerHTML = cards[i].characterrarity;
                        divToggle.className = 'container-taggle';
                        inputToggle.type = 'checkbox';
                        inputToggle.className = 'input-toggle';
                        inputToggle.id = cards[i].cardid;
                        inputToggle.dataset.change = cards[i].change_available;
                        inputToggle.onclick = isChecked;
                        checked.innerHTML = 'Disponível para troca ?';

                        if(inputToggle.dataset.change === true){
                            inputToggle.style.checked = true;
                        };

                        myCollection.appendChild(containerImg);
                        containerImg.appendChild(img);
                        containerImg.appendChild(name);
                        containerImg.appendChild(rarely);
                        containerImg.appendChild(divToggle);
                        divToggle.appendChild(inputToggle);
                        divToggle.appendChild(checked);
                    };
                };

                function isChecked(event){
                    const options = {
                        method: "PUT"   
                    };
                    fetch(`api/cards/${event.target.id}/${event.target.checked}`, options)
                    .then((res) => console.log(res))
                };
            } catch (error) {
                console.log(error);
            }
            break;
    }
};

window.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener("click", async (e) => {
        if (e.target.matches("[data-link]")) {
            linkClick(e);
        };
        if (e.target.matches('.modal')) {
            closeModals();
        }
        if (e.target.matches("[data-loginPost]")) {
            login();
        };
        if (e.target.matches("[data-logoutPost]")) {
            logout();
        };
        if (e.target.matches("[data-signupPost]")) {
            signup();
        };
        if (e.target.matches("[data-buyPackagePost]")) {
            buyCard(e);
        }
        if (e.target.matches("[data-getChangeReq]")) {
            getChangeRequests(e);
        }
        if (e.target.matches("[data-finishChangeReq]")) {
            finishChangeRequest(e);
        }
        if (e.target.matches("[data-brandPost")) {
            createBrand();
        }
        if (e.target.matches("[data-packagePost")) {
            createPackage();
        }
        if (e.target.matches("[data-characterPost")) {
            createCharacter();
        }
        if (e.target.matches("[data-adminProfilePut]")) {
            updateAdminProfile();
        }
        if (e.target.matches("[data-profilePut]")) {
            updateUserProfile();
        }
    });
    router();
});

window.addEventListener('popstate', router);

backBtn404.addEventListener('click', () => {
    window.history.back();
});