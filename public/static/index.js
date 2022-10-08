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
import { navigateTo } from './methods.js';

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
    '/admin-profile': AdminProfileView
};

const userName = document.querySelector('#profile-user-name');
const profileImg = document.querySelector('#profile-img');

const adminName = document.querySelector('#profile-admin-name');
const adminProfileImg = document.querySelector('#profile-admin-img');

const userImgPreview = document.querySelector('#user-img-preview');
const userImg = document.querySelector('#profile-edit-img');
const adminImgPreview = document.querySelector('#admin-img-preview');
const adminImg = document.querySelector('#admin-profile-edit-img');
const packageImgPreview = document.querySelector('#package-img-preview');
const packageImg = document.querySelector('#addpackage-image');
const characterImgPreview = document.querySelector('#character-img-preview');
const characterImg = document.querySelector('#addcharacter-image');

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
    document.querySelector('#profile-admin-container').style.display = "none";

    let path = window.location.pathname;

    if (path == '/' || path == '/login' || path == '/signup' ) {
        document.querySelector('#unauthenticated-header').style.display = "flex";
    }
    
    else if (path == '/home' || path == '/profile' || path == '/collection' || path == "/trade" || path == "/pendingtrade") {
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

    else if (path == '/addpackage' || path == '/addcharacter' || path == '/addbrand' || path == '/admin-profile') {
        try {
            const res = await fetch('api/admin');
            if (res.status !== 200) {
                const error = await res.json();
                throw new Error(`${error.message}`);
            }
            const data = await res.json();
            document.querySelector('#authenticated-admin-header').style.display = "flex";
            document.querySelector('#profile-admin-container').style.display = "flex";
            adminName.innerText = `${data.userName}`;
            adminProfileImg.src = `./images/uploads/${data.userID}.png`
        } catch (error) {
            console.log(`${error.message}`);
            path = '/home';
            navigateTo(path);
        }
    }

    else {
        path = '404';
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
                        <img src="./images/uploads/package/${packageRes.packages[i].id}.jpg" alt="Pacote disney ${packageRes.packages[i].type}" class="packages">
                        <div class="box-shop">
                            <p><img src="/images/coin-svgrepo-com.svg" class="coins-img" />${packageRes.packages[i].price}</p>
                            <p>Pacote ${packageRes.packages[i].brand}</p>
                            <p>${packageRes.packages[i].type}</p>
                            <p class="package-chances">CHANCE COMUM ${commonchance}%</p>
                            <p class="package-chances">CHANCE RARO ${rarechance}%</p>
                            <p class="package-chances">CHANCE ULTRARARO ${packageRes.packages[i].chance_ultrarare}%</p>
                            <button class="btn-shop" id="${packageRes.packages[i].id}" data-value="${packageRes.packages[i].price}" data-buyPackagePost>Comprar</button>
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
        case '/trade':
        case '/pendingtrade':
        case '/addpackage':
            try {
                const addPackageSelectBrand = document.querySelector('#addpackage-input-series');
                addPackageSelectBrand.innerHTML = '';
                const res = await fetch('api/brands');
                if (res.status !== 200) {
                    const error = await res.json();
                    throw new Error(`${error.message}`);
                }
                const data = await res.json();
                for ( let i = 0; i < data.brands.length; i++) {
                    addPackageSelectBrand.innerHTML += `<option value="${data.brands[i].id}">${data.brands[i].name}${data.brands[i].series}</option>`
                }
            } catch (error) {
                console.log(`${error.message}`);
                path = '/addbrand';
                navigateTo(path);
            }
            break;
        case '/addcharacter':
            try {
                const addCharacterSelectBrand = document.querySelector('#addcharacter-input-series');
                addCharacterSelectBrand.innerHTML = '';
                const res = await fetch('api/brands');
                if (res.status !== 200) {
                    const error = await res.json();
                    throw new Error(`${error.message}`);
                }
                const data = await res.json();
                for ( let i = 0; i < data.brands.length; i++) {
                    addCharacterSelectBrand.innerHTML += `<option value="${data.brands[i].id}">${data.brands[i].name}${data.brands[i].series}</option>`
                }
            } catch (error) {
                console.log(`${error.message}`);
                path = '/addbrand';
                navigateTo(path);
            }
            break;
    }
    const view = new routes[path];
};

window.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener("click", async (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            userImgPreview.src = './images/default-profile.svg';
            adminImgPreview.src = './images/default-profile.svg';
            characterImgPreview.src = './images/default-profile.svg';
            packageImgPreview.src = './images/default-profile.svg';
            navigateTo(e.target.href);
        };
        if (e.target.matches('.modal')) {
            closeShopModal();
            closePendingTradeModal();
        }
        if (e.target.matches("[data-buyPackagePost]")) {
            try {
                const packageID = e.target.id;
                //const packagePrice = e.target.dataset.value;
                const options = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },              
                };
                const response = await fetch(`api/packages/${packageID}`, options)
                if (response.status !== 200) {
                    const error = await response.json();
                    throw new Error(`${error.message}`);
                };
                const cardObject = await response.json();
                console.log(cardObject);
                const acquiredCard = cardObject.card;
                if(acquiredCard.error === null) {
                    openShopModal();
                };
                const acqCardImg = document.querySelector('.card-acquired');
                const acqCardName = document.querySelector('.name-new-card');
                const acqCardRarity = document.querySelector('.rarity-new-card');
                acqCardImg.src = `../images/uploads/${acquiredCard.card_id}.png`;
                acqCardName.textContent = `${acquiredCard.character_name}`;
                acqCardRarity.textContent = `${acquiredCard.rarity}`;
            } catch (error) {
                console.log(`${error.message}`);
                navigateTo('/home');
            }
        }
        if (e.target.matches("[data-getChangeReq]")) {
            openPendingTradeModal();
        }
        if (e.target.matches("[data-loginPost]")) {
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
        if (e.target.matches("[data-signupPost]")) {
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
                if (response.status !== 201) {
                    const error = await response.json();
                    throw new Error(`${error.message}`);
                }
                navigateTo('/login');
            } catch (error) {
                console.log(`${error.message}`)
            }            
        };
        if (e.target.matches("[data-brandPost")) {
            try {
                const brandName = document.querySelector('#addbrand-input-name').value;
                const brandSeries = document.querySelector('#addbrand-input-series').value;
                if (!brandName || !brandSeries) {
                    throw new Error('Preencha todos os campos!');
                }
                const bodyValue = {
                    name: brandName,
                    series: brandSeries
                }
                const options = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bodyValue)                
                };
                const response = await fetch('api/brands', options);
                if (response.status !== 201) {
                    const error = await response.json();
                    throw new Error(`${error.message}`);
                }
            } catch (error) {
                console.log(`${error.message}`)
            }
        }
        if (e.target.matches("[data-packagePost")) {
            try {
                const packageSeries = document.querySelector('#addpackage-input-series').value;
                const packageRarity = document.querySelector('#addpackage-rarity').value;
                const packagePrice = document.querySelector('#addpackage-price').value;
                const packageRareChance = parseInt(document.querySelector('#addpackage-rarechance').value) + parseInt(document.querySelector('#addpackage-ultrararechance').value);
                const packageUltraRareChance = parseInt(document.querySelector('#addpackage-ultrararechance').value);
                if (!packageSeries || !packageRarity || !packagePrice || !packageRareChance || !packageUltraRareChance) {
                    throw new Error('Preencha todos os campos!');
                }
                const formData = new FormData();
                formData.append("brand", packageSeries);
                formData.append("type", packageRarity);
                formData.append("price", packagePrice);
                formData.append("chancerare", packageRareChance);
                formData.append("chanceultrarare", packageUltraRareChance);
                const options = {
                    method: "POST",
                    body: formData                
                };
                const response = await fetch('api/packages', options);
                if (response.status !== 201) {
                    const error = await response.json();
                    throw new Error(`${error.message}`);
                }
                const data = await response.json();
                const formImageData = new FormData();
                formImageData.append("package-image", packageImg.files[0]);
                const optionstwo = {
                    method: "POST",
                    body: formImageData
                }
                const responsetwo = await fetch(`api/packageimage/${data.packageID}`, optionstwo);
                if (responsetwo.status !== 201) {
                    const errortwo = await responsetwo.json();
                    throw new Error(`${errortwo.message}`);
                }
                packageImgPreview.src = './images/default-profile.svg';
            } catch (error) {
                console.log(`${error.message}`)
            }
        }
        if (e.target.matches("[data-characterPost")) {
            try {
                const characterSeries = document.querySelector('#addcharacter-input-series').value;
                const characterRarity = document.querySelector('#addcharacter-rarity').value;
                const characterName = document.querySelector('#addcharacter-input-name').value;
                if (!characterSeries || !characterRarity || !characterName) {
                    throw new Error('Preencha todos os campos!');
                }
                const formData = new FormData();
                formData.append("brand", characterSeries);
                formData.append("rarity", characterRarity);
                formData.append("name", characterName);
                const options = {
                    method: "POST",
                    body: formData                
                };
                const response = await fetch('api/character', options);
                if (response.status !== 201) {
                    const error = await response.json();
                    throw new Error(`${error.message}`);
                }
                const data = await response.json();
                const formImageData = new FormData();
                formImageData.append("character-image", characterImg.files[0]);
                const optionstwo = {
                    method: "POST",
                    body: formImageData
                }
                const responsetwo = await fetch(`api/characterimage/${data.characterID}`, optionstwo);
                if (responsetwo.status !== 201) {
                    const errortwo = await responsetwo.json();
                    throw new Error(`${errortwo.message}`);
                }
                characterImgPreview.src = './images/default-profile.svg';
            } catch (error) {
                console.log(`${error.message}`)
            }
        }
        if (e.target.matches("[data-adminProfilePut]")) {
            try {
                const adminNewImg = adminImg.files[0];
                const adminNewName = document.querySelector('#admin-profile-name-input').value;
                const adminNewEmail = document.querySelector('#admin-profile-email-input').value;
                const adminNewPassword = document.querySelector('#admin-profile-password-input').value;
                const formData = new FormData();
                if(adminNewImg) formData.append("profile-image", adminNewImg);
                if(adminNewName) formData.append("name", adminNewName);
                if(adminNewEmail) formData.append("email", adminNewEmail);
                if(adminNewPassword) formData.append("password", adminNewPassword);
                const options = {
                    method: "PUT",
                    body: formData
                }
                const response = await fetch('api/user', options);
                if (response.status !== 200) {
                    const error = await response.json();
                    throw new Error(`${error.message}`);
                }
                const data = await response.json();
                adminName.innerText = `${data.name}`;
                adminProfileImg.src = `./images/uploads/${data.userID}.png`
                adminImgPreview.src = './images/default-profile.svg';
            } catch (error) {
                console.log(error.message);
            };
        }
        if (e.target.matches("[data-profilePut]")) {
            try {
                const newImg = userImg.files[0];
                const newName = document.querySelector('#profile-name-input').value;
                const newEmail = document.querySelector('#profile-email-input').value;
                const newPassword = document.querySelector('#profile-password-input').value;
                const formData = new FormData();
                if(newImg) formData.append("profile-image", newImg);
                if(newName) formData.append("name", newName);
                if(newEmail) formData.append("email", newEmail);
                if(newPassword) formData.append("password", newPassword);
                const options = {
                    method: "PUT",
                    body: formData
                }
                const response = await fetch('api/user', options);
                if (response.status !== 200) {
                    const error = await response.json();
                    throw new Error(`${error.message}`);
                }
                const data = await response.json();
                userName.innerText = `${data.name}`;
                profileImg.src = `./images/uploads/${data.userID}.png`
                userImgPreview.src = './images/default-profile.svg';
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

userImg.addEventListener('change', (e) => {
    const url = window.URL.createObjectURL(e.target.files[0]);
    userImgPreview.src = url;
    userImgPreview.onload = function() { window.URL.revokeObjectURL(url) }
})
adminImg.addEventListener('change', (e) => {
    const url = window.URL.createObjectURL(e.target.files[0]);
    adminImgPreview.src = url;
    adminImgPreview.onload = function() { window.URL.revokeObjectURL(url) }
})
characterImg.addEventListener('change', (e) => {
    const url = window.URL.createObjectURL(e.target.files[0]);
    characterImgPreview.src = url;
    characterImgPreview.onload = function() { window.URL.revokeObjectURL(url) }
})
packageImg.addEventListener('change', (e) => {
    const url = window.URL.createObjectURL(e.target.files[0]);
    packageImgPreview.src = url;
    packageImgPreview.onload = function() { window.URL.revokeObjectURL(url) }
})

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