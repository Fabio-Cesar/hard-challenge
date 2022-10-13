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
import { buyCard, closeModals, createBrand, createCharacter, createPackage, getChangeRequests, linkClick, login, logout, navigateTo, signup, updateAdminProfile, updateUserProfile, openErrorModal, finishChangeRequest, toggleChange, createRequest, listChangeableCards, filterPackagesByName, filterMyCollection, filterTrades, filterMyCollectionTrade, filterMyPendingTrade, filterOffers } from './methods.js';

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
            userCoins.innerText = `${data.userCoins}`;
            const view = new routes[path];
            const viewData = await view.getData();
        } catch (error) {
            openErrorModal(`${error.message}`);
            navigateTo('/login');
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
        if (e.target.matches(".toggle-change")) {
            toggleChange(e);
        }
        if (e.target.matches('[data-cardTradeRequest]')) {
            listChangeableCards(e)
        }
        if (e.target.matches("[data-cardTradeOffer]")) {
            createRequest(e)
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
        if (e.target.matches(".locate-package-btn")) {
            filterPackagesByName();
        }
        if (e.target.matches(".locate-collection-btn")) {
            filterMyCollection();
        }
        if (e.target.matches(".locate-trade-btn")) {
            filterTrades();
        }
        if (e.target.matches(".locate-trade-collection-btn")) {
            filterMyCollectionTrade();
        }
        if (e.target.matches(".locate-pending-btn")) {
            filterMyPendingTrade();
        }
        if (e.target.matches(".locate-pending-offer-btn")) {
            filterOffers();
        }
    });
    router();
});

window.addEventListener('popstate', router);

backBtn404.addEventListener('click', () => {
    window.history.back();
});