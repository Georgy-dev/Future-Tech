const rootSelector = "[data-js-input-mask]";

class InputMask {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.init();
    }

    init() {
        const isLibReady = typeof window.IMask !== undefined; // проверка на подключение библиотеки

        if (isLibReady) {
            window.IMask(this.rootElement, {
                mask: this.rootElement.dataset.jsInputMask, // получаем доступ к значению аттрибута data-js-input-mask
            });
        } else {
            console.error(
                `Library "IMask" is undefined! Please check it's connection and try again`
            );
        }
    }
}

class InputMaskCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new InputMask(element);
        });
    }
}

export default InputMaskCollection;
