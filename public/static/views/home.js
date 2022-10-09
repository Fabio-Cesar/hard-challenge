import View from './view.js';
import { navigateTo, openErrorModal } from '../methods.js';

export class HomeView extends View {

    constructor() {
        super();
        this.display = '#home-page';
    };

    async getData() {
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
                        <button class="btn-shop" id="${packageRes.packages[i].id}" data-buyPackagePost>Comprar</button>
                   </div>
                </div>`
            };
        } catch (error) {
            openErrorModal(error.message);
            navigateTo('/');
        };
    }
};