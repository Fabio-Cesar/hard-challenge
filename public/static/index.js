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

const userName = document.querySelector('#profile-user-name');
const profileImg = document.querySelector('#profile-img');

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

    if (path == '/' || path == '/login' || path == '/signup' ) {
        document.querySelector('#unauthenticated-header').style.display = "flex";
    }

    if (path == '/home' || path == '/profile' || path == '/collection' || path == "/trade" || path == "/pendingtrade") {
        try {
            const response = await fetch('api/user');
            if (response.status !== 200) {
                const error = await response.json();
                throw new Error(`${error.message}`);
            }
            const data = await response.json();
            document.querySelector('#authenticated-user-header').style.display = "flex";
            document.querySelector('#profile-container').style.display = "flex";
            userName.innerText = `${data.userName}`;
            profileImg.src = `./images/uploads/${data.userID}.png`
        } catch (error) {
            console.log(`${error.message}`);
            path = '/';
            navigateTo(path);
        }
    }

    if (path == '/addpackage' || path == '/addcharacter') {
        try {
            const res = await fetch('api/admin');
            if (res.status !== 200) {
                const error = await res.json();
                throw new Error(`${error.message}`);
            }
            const data = await res.json();
            document.querySelector('#authenticated-admin-header').style.display = "flex";
            document.querySelector('#profile-container').style.display = "flex";
            userName.innerText = `${data.userName}`;
            profileImg.src = `./images/uploads/${data.userID}.png`
        } catch (error) {
            console.log(`${error.message}`);
            path = '/';
            navigateTo(path);
        }
    }

    switch (path) {
        case '/home':
            try {
                const packageContainer = document.querySelector('#shop-packages');
                packageContainer.innerHTML = '';
                const homeResponse = await fetch('api/packages');
                if (homeResponse.status !== 200) {
                    const error = await homeResponse.json();
                    throw new Error(`${error.message}`);
                }
                const packageRes = await homeResponse.json();
                let commonchance;
                let rarechance;
                for (let i = 0; i < packageRes.packages.length; i++) {
                    commonchance = 100 - packageRes.packages[i].chance_rare;
                    rarechance = packageRes.packages[i].chance_rare - packageRes.packages[i].chance_ultrarare;
                    packageContainer.innerHTML += `<div class="container-packages">
                        <img src="./images/uploads/${packageRes.packages[i].id}.jpg" alt="Pacote disney ${packageRes.packages[i].type}" class="packages">
                        <div class="box-shop">
                            <p><img src="/images/coin-svgrepo-com.svg" class="coins-img" />${packageRes.packages[i].price}</p>
                            <p>Pacote ${packageRes.packages[i].brand}</p>
                            <p>${packageRes.packages[i].type}</p>
                            <p class="package-chances">CHANCE COMUM ${commonchance}%</p>
                            <p class="package-chances">CHANCE RARO ${rarechance}%</p>
                            <p class="package-chances">CHANCE ULTRARARO ${packageRes.packages[i].chance_ultrarare}%</p>
                            <button class="btn-shop" id="${packageRes.packages[i].id} data-value="${packageRes.packages[i].price}" data-buyPackagePost>Comprar</button>
                       </div>
                    </div>`
                };
            } catch (error) {
                path = '/';
                navigateTo(path);
            };
            break;
        case '/profile':
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
        case '/trade':
        case '/pendingtrade':
    }
    const view = new routes[path] || new routes['404'];
};

window.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener("click", async (e) => {
        if (e.target.matches('.modal')) {
            closeShopModal();
            closePendingTradeModal();
        }
        if (e.target.matches("[data-buyPackagePost]")) {
            openShopModal();
        }
        if (e.target.matches("[data-getChangeReq]")) {
            openPendingTradeModal();
        }
        if (e.target.matches("[data-loginPost]")) {
            e.preventDefault();

            try {
                const emailValue = document.querySelector('#login-input-email').value;
                const passwordValue = document.querySelector('#login-input-password').value;
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
                    const error = await response.json();
                    throw new Error(`${error.message}`);
                }
                const data = await response.json();
                console.log(data.admin);
                console.log(data);
                if (data.admin) {
                    navigateTo('/addpackage');
                } else {
                    navigateTo('/home');
                }
            } catch (error) {
                console.log(`${error.message}`);
                navigateTo('/');
            }
        };
        if (e.target.matches("[data-logoutPost]")) {
            e.preventDefault();
            try {
                const options = { method: "POST" };
                const response = await fetch('api/logout', options);
                if (response.status !== 200) {
                    const error = await response.json();
                    throw new Error(`${error.message}`);
                }
                navigateTo('/login');
            } catch (error) {
                console.log(`${error.message}`);
                navigateTo('/');   
            }
        };
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        };
        if (e.target.matches("[data-signupPost]")) {
            e.preventDefault();
            try {
                const emailValue = document.querySelector('#signup-input-email').value;
                const passwordValue = document.querySelector('#signup-input-password').value;
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
                if (response.status !== 200) {
                    const error = await response.json();
                    throw new Error(`${error.message}`);
                }
                navigateTo('/login');
            } catch (error) {
                console.log(`${error.message}`);
                navigateTo('/');   
            }            
        };
        if (e.target.matches("[data-profilePut]")) {
            e.preventDefault();

            try {
                const formData = new FormData();
                formData.append("profile-image", document.querySelector('#profile-edit-img').files[0]);
                formData.append("name", document.querySelector('#profile-name-input').value);
                formData.append("email", document.querySelector('#profile-email-input').value);
                formData.append("password", document.querySelector('#profile-password-input').value);
                const options = {
                    method: "POST",
                    body: formData
                }
                const response = await fetch('api/user', options);
                if (response.status !== 200) {
                    const error = await response.json();
                    throw new Error(`${response.message}`);
                }
                const data = await response.json();
                userName.innerText = `${data.name}`;
                profileImg.src = `./images/uploads/${data.userID}.png`
            } catch (error) {
                console.log(error.message);
            };
        }
    });
    router();
});

window.addEventListener('popstate', router);

document.querySelector('#back-btn').addEventListener('click', () => {
    window.history.back();
});

const shopModal = document.querySelector('#shop-modal');
const pendingTradeModal = document.querySelector('#pendingtrade-modal');

const btnCloseShopModal = document.querySelector('#icon-close-shop-modal');
btnCloseShopModal.addEventListener('click', closeShopModal);
const btnClosePendingModal = document.querySelector('#icon-close-pending-modal');
btnClosePendingModal.addEventListener('click', closePendingTradeModal);

function closeShopModal(){
    shopModal.style.display = 'none';
}

function closePendingTradeModal(){
    pendingTradeModal.style.display = 'none';
}

function openShopModal(){
    shopModal.style.display = 'flex';
}

function openPendingTradeModal(){
    pendingTradeModal.style.display = 'flex';
}