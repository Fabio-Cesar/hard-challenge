import View from './view.js';

export class NotFoundView extends View {

    constructor() {
        super();
    };

    async getHTML() {
        return `<p>Not Found</p>`;
    };
};