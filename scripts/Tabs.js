const rootSelector = "[data-js-tabs]";

class Tabs {
    // для основной логики конкретной группы табов
    selectors = {
        root: rootSelector,
        button: "[data-js-tabs-button]",
        content: "[data-js-tabs-content]",
    };

    stateClasses = {
        isActive: "is-active",
    };

    stateAttributes = {
        // этот объект понадобится, когда мы будем обновлять значения аттрибутов у DOM-элементов
        ariaSelected: "aria-selected",
        tabIndex: "tabindex",
    };

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.buttonElements = this.rootElement.querySelectorAll(
            this.selectors.button
        );
        this.contentElements = this.rootElement.querySelectorAll(
            this.selectors.content
        );
        this.state = {
            activeTabIndex: [...this.buttonElements].findIndex(
                (buttonElement) =>
                    buttonElement.classList.contains(this.stateClasses.isActive)
                // таким образом мы найдем индекс кнопки, у которой есть класс is-active
            ),
        };
        this.limitTabsIndex = this.buttonElements.length - 1;
        this.bindEvents();
    }

    updateUI() {
        const { activeTabIndex } = this.state;

        this.buttonElements.forEach((buttonElement, index) => {
            const isActive = index === activeTabIndex;

            buttonElement.classList.toggle(
                this.stateClasses.isActive,
                isActive
            );

            buttonElement.setAttribute(
                this.stateAttributes.ariaSelected,
                isActive.toString()
            );

            buttonElement.setAttribute(
                this.stateAttributes.tabIndex,
                isActive ? "0" : "-1"
            );
        });

        this.contentElements.forEach((contentElement, index) => {
            const isActive = index === activeTabIndex;

            contentElement.classList.toggle(
                this.stateClasses.isActive,
                isActive
            );
        });
    }

    activateTab(newTabIndex) {
        this.state.activeTabIndex = newTabIndex;
        this.buttonElements[newTabIndex].focus();
    }

    previousTab = () => {
        const newTabIndex =
            this.state.activeTabIndex === 0
                ? this.limitTabsIndex
                : this.state.activeTabIndex - 1;

        this.activateTab(newTabIndex);
    };

    nextTab = () => {
        const newTabIndex =
            this.state.activeTabIndex === this.limitTabsIndex
                ? 0
                : this.state.activeTabIndex + 1;

        this.activateTab(newTabIndex);
    };

    firstTab = () => {
        this.activateTab(0);
    };

    lastTab = () => {
        this.activateTab(this.limitTabsIndex);
    };

    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex;

        this.updateUI();
    }

    onKeyDown = (e) => {
        const { code, metaKey } = e;

        const action = {
            ArrowLeft: this.previousTab,
            ArrowRight: this.nextTab,
            Home: this.firstTab,
            End: this.lastTab,
        }[code]; // создали объект и сразу по имени свойства получили ссылку на конкретный метод класса Tabs

        const isMacHomeKey = metaKey && code === "ArrowLeft";

        if (isMacHomeKey) {
            this.firstTab();

            this.updateUI();

            return; // чтобы выполнился только этот код, а не все сразу
        }

        const isMacEndKey = metaKey && code === "ArrowRight";

        if (isMacEndKey) {
            this.lastTab();

            this.updateUI();

            return; // чтобы выполнился только этот код, а не все сразу
        }

        // action?.(); // чтобы код не ломался (?. проверяет на undefined)

        if (action) {
            action();
            this.updateUI();
        }
    };

    bindEvents() {
        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener("click", () =>
                this.onButtonClick(index)
            );
        });

        this.rootElement.addEventListener("keydown", this.onKeyDown);
    }
}

class TabsCollection {
    // для инициализации всех табов на одной странице
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Tabs(element);
        });
    }
}

export default TabsCollection;
