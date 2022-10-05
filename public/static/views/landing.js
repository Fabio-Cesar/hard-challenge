import View from './view.js';

export class LandingView extends View {

    constructor() {
        super();
        this.cssHref = "./css/landing.css";
    };

    async getHTML() {
        return `<header class="flex">
        <div id="header-container" class="flex">
            <div id="menu-home">
                <h1>cardCreator</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="/login" id="menu-enter" data-link>Entrar</a></li>
                    <li><a href="/signin" id="menu-register" data-link>Cadastre-se</a></li>
                    <li><a href="/about" id="menu-about" data-link>Sobre</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main id="main-container" class="flex">
        <section id="section-container">
            <div id="texts-home">
                <div id="main-text-home">
                    <span>Crie sua coleção</span>
                    <span>de cards</span>
                    <span>personalizada</span>
                </div>
                <div id="secundary-text-home">
                    <span>Adquira já os cards da edição limitada</span>
                    <span>e crie sua coleção personalizada</span>
                </div>
                <span>Troque com amigos e divirta-se</span>
            </div>
            <img id="img-cards" src="../images/packages-principal.png" alt="cards colecionáveis">
        </section>
    </main>`
    };
};