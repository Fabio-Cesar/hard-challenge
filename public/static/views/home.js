import View from './view.js';

export class HomeView extends View {

    constructor() {
        super();
    };
    
    async getHTML() {
        return `<p>Hello</p><form action="/logout" method="post"><button type="button"><a href="/login" data-link>Sair</a></button></form>`;
    };
};