export default class View {
    constructor() {
    };

    set cssHref(href) {
        document.querySelectorAll("link[rel='stylesheet']")[0].href = href;
    };

    async getHTML() {
        return ``;
    };
}