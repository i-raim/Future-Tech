const rootSelector = '[data-js-tabs]'

class Tabs {
    selectors = {
        root: rootSelector,
        button: '[data-js-tabs-button]',
        content: '[data-js-tabs-content]',
    }

    stateClasses = {
        isActive: 'is-active'
    }

    stateAttributes = {
        ariaSelected: 'aria-selected',
        tabIndex: 'tabindex',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)
        this.sate = {
            activeTabIndex: [...this.buttonElements].findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive))     
        }

        this.limitTabsIndex = this.buttonElements.length -1
        this.bindEvents()
    }

    updateUI() {
        const {activeTabIndex} = this.sate

        this.buttonElements.forEach((buttonELement,index) => {
            const isActive = index === activeTabIndex

            buttonELement.classList.toggle(this.stateClasses.isActive, isActive)
        })

        this.contentElements.forEach((contentElement, index) => {
            const isActive = index === activeTabIndex

            contentElement.classList.toggle(this.stateClasses.isActive, isActive)
        })
    }

    onButtonClick(buttonIndex) {
        this.sate.activeTabIndex = buttonIndex
        this.updateUI()
    }

    bindEvents() {
        this.buttonElements.forEach((buttonELement, index) => {
            buttonELement.addEventListener('click',() => this.onButtonClick(index))
        })
    }
}

class TabsCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((Element) => {
            new Tabs(Element)
        })
    }
}

export default TabsCollection