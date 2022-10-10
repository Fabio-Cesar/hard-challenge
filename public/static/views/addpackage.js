import View from './view.js';

export class AddPackageView extends View {
    
    constructor() {
        super();
        this.display = "#addpackage-page";
    };

    async getData() {
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
            navigateTo('/addpackage');
        }
    }
};