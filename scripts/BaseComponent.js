// абстрактный класс - класс, от которого наследуют другие классы

class BaseComponent {
    constructor() {
        if (this.constructor === BaseComponent) {
            throw new Error(
                "Невозможно создать экземпляр абстрактного класса BaseComponent!"
            );
            // то есть нельзя писать new BaseComponent()
        }
    }

    getProxyState(initialState) {
        return new Proxy(initialState, {
            get: (target, prop) => {
                return target[prop];
            },
            set: (target, prop, newValue) => {
                const oldValue = target[prop];

                target[prop] = newValue;

                if (oldValue !== newValue) {
                    this.updateUI();
                } // чтобы лишний раз не нагружать браузер

                return true;
            },
        });
    }

    // перерисовка UI в ответ на обновление состояния
    updateUI() {
        throw new Error("Необходимо реализовать метод updateUI()!");
    }
}

export default BaseComponent;
