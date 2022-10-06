export default class View {

    set display(view) {
        document.querySelector(view).style.display = "flex";
    };

    async getHTML() {
        return;
    };
};