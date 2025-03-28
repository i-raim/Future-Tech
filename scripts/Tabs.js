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

    activateTab (newTabIndex) {
        this.state.activeTabIndex = newTabIndex
        this.buttonElements[newTabIndex].focus()
    }

    previousTab = () => {
        const newTabIndex = this.state.activeTabIndex === 0
        ? this.limitTabsIndex
        : this.sate.activeTabIndex - 1

        this.activateTab(newTabIndex)
    }

    nextTab = () => {
        const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex
        ? 0
        : this.state.activeTabIndex + 1

        this.activateTab(newTabIndex)
    }

    firstTab = () => {
        this.activateTab(0)
    }

    lastTab = () => {
        this.activateTab(this.limitTabsIndex)
    }

    onButtonClick(buttonIndex) {
        this.sate.activeTabIndex = buttonIndex
        this.updateUI()
    }

    onKeyDown = (event) => {
        const {code, metaKey} = event

        const action = {
            ArrowLeft: this.previousTab,
            ArrowRight: this.nextTab,
            Home: this.firstTab,
            End: this.lastTab,
        }[code]

        const isMacHomeKey = metaKey && code === 'ArrowLeft'
        if(isMacHomeKey) {
            this.firstTab()
            return
        }

        const isMacEndKey = metaKey && code === 'ArrowRight'
        if(isMacEndKey) {
            this.lastTab()
            return
        }

        action?.()
    }

    bindEvents() {
        this.buttonElements.forEach((buttonELement, index) => {
            buttonELement.addEventListener('click',() => this.onButtonClick(index))
        })

        this.rootElement.addEventListener('keydown', this.onKeyDown)
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