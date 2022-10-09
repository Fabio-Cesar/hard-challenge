import View from './view.js';
import { navigateTo, openErrorModal } from '../methods.js';

export class PendingTradeView extends View {
    
    constructor() {
        super();
        this.display = "#pendingtrade-page";
    };

    async getData() {
        try {
            const changeableUserCardsContainer = document.querySelector('#changeable-cards-container');
            changeableUserCardsContainer.innerHTML = '';
            const changeableCardsResponse = await fetch('api/user-changeable-cards');
            if (changeableCardsResponse.status !== 200) {
                const error = await changeableCardsResponse.json();
                throw new Error(`${error.message}`);
            }
            const data = await changeableCardsResponse.json()
            for (let i = 0; i < data.cards.length; i++) {
                changeableUserCardsContainer.innerHTML += `<div class="changeablecard">
                <img src="./images/uploads/character/${data.cards[i].character_id}.png" class="changeablecard-img"/>
                <p>${data.cards[i].name}</p>
                <p>${data.cards[i].brand_name} ${data.cards[i].brand_series}</p>
                <p>${data.cards[i].rarity}</p>
                <button class="pending-cardbtn" id="${data.cards[i].card_id}" data-getChangeReq>Ver Pedidos</button>
            </div>`
            };
        } catch (error) {
            openErrorModal(error.message);
            navigateTo('/');
        }
        
    }
};