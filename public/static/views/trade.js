import View from './view.js';

export class TradeView extends View {
    
    constructor() {
        super();
        this.display = "#trade-page";
    };

    async getData() {
        try {
            const tradeCardContainer = document.querySelector('#trade-cards');
            tradeCardContainer.innerHTML = '';
            const tradeResponse = await fetch('api/changeable-cards');
            if (tradeResponse.status !== 200) {
                const error = await tradeResponse.json();
                throw new Error(`${error.message}`);
            }
            const tradeCardsRes = await tradeResponse.json();
            for (let i = 0; i < tradeCardsRes.cards.length; i++) {
                tradeCardContainer.innerHTML += `<div class="container-packages">
                    <img src="./images/uploads/character/${tradeCardsRes.cards[i].character_id}" alt="${tradeCardsRes.cards[i].character_name}" class="packages">
                    <div class="box-shop">
                        <p>${tradeCardsRes.cards[i].character_name}</p>
                        <p>${tradeCardsRes.cards[i].brand_name} ${tradeCardsRes.cards[i].brand_series}</p>
                        <p>${tradeCardsRes.cards[i].character_rarity}</p>
                        <button class="btn-shop" id="${tradeCardsRes.cards[i].card_id}" data-cardTradeRequest>Negociar</button>
                   </div>
                </div>`
            };
        } catch (error) {
            path = '/';
            navigateTo(path);
        };
    }
};