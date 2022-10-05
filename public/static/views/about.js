import View from './view.js';

export class AboutView extends View {
    constructor() {
        super();
    };

    async getHTML() {
        return `About`;
    };
}