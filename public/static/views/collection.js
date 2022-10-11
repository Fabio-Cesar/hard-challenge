import View from './view.js';
import { openErrorModal, navigateTo } from '../methods.js';

export class CollectionView extends View {
    
    constructor() {
        super();
        this.display = "#collection-page";
    };

    async getData() {
        try {
            const myCollection = document.querySelector('#my-collection');
            myCollection.innerHTML = '';
            const cardsResponse = await fetch('api/cards');
            if (cardsResponse.status !== 200) {
                const error = await cardsResponse.json();
                throw new Error(`${error.message}`);
            }
            const data = await cardsResponse.json();
            for (let i = 0; i < data.cards.length; i++) {
                const containerImg = document.createElement('div');
                const img = document.createElement('img');
                const name = document.createElement('p');
                const brand = document.createElement('p');
                const rarely = document.createElement('p');
                const divToggle = document.createElement('div');
                const inputToggle = document.createElement('input')
                const checked = document.createElement('label')
                containerImg.className = 'container-card-collection';
                img.src = `./images/uploads/character/${data.cards[i].characterid}.png`;
                img.className = 'img-my-collection';
                name.className = 'name-card-collection';
                name.innerHTML = data.cards[i].charactername;
                brand.innerHTML = `${data.cards[i].brand_name} ${data.cards[i].brand_series}`
                rarely.className = 'rarely-card-collection';
                rarely.innerHTML = data.cards[i].characterrarity;
                divToggle.className = 'container-taggle';
                inputToggle.type = 'checkbox';
                inputToggle.id = data.cards[i].cardid;
                inputToggle.dataset.change = data.cards[i].change_available;
                inputToggle.checked = data.cards[i].change_available;
                inputToggle.className = 'toggle-change';
                checked.innerHTML = 'Diponibilizar para troca';
                checked.setAttribute('for',data.cards[i].cardid);
                myCollection.appendChild(containerImg);
                containerImg.appendChild(img);
                containerImg.appendChild(name);
                containerImg.appendChild(brand);
                containerImg.appendChild(rarely);
                containerImg.appendChild(divToggle);
                divToggle.appendChild(inputToggle);
                divToggle.appendChild(checked);
            }
        } catch (error) {
            openErrorModal(error.message);
            navigateTo('/collection');
        }
    }
};