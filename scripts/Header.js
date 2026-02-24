class Header {
    selectors = {
        root: "[data-js-header]",
        overlay: "[data-js-header-overlay]",
        burgerButton: "[data-js-header-burger-button]",
    }; // хранит свойства с css селекторами в значении по data-attribute

    stateClasses = {
        isActive: "is-active",
        isLock: "is-lock",
    }; // css-классы состояний

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root); // ссылка на корневой DOM-element, который мы разрабатываем
        this.overlayElement = this.rootElement.querySelector(
            this.selectors.overlay
        ); // по аналогии с первым
        this.burgerButtonElement = this.rootElement.querySelector(
            this.selectors.burgerButton
        );
        this.bindEvents();
    } // автоматом выполняет код при инициализации

    onBurgerButtonClick = () => {
        // обязательно через стрелочную запись
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive);
        this.overlayElement.classList.toggle(this.stateClasses.isActive);

        document.documentElement.classList.toggle(this.stateClasses.isLock); // это для тега <html>. См подробнее в _globals html.is-lock
    };

    bindEvents() {
        this.burgerButtonElement.addEventListener(
            "click",
            this.onBurgerButtonClick
        );
    } // в этом методе мы привязываем события к DOM-elementам
}

export default Header;
