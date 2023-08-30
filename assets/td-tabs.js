//check if element already exists
if (!customElements.get("td-tabs-element")) {
  class tabCustomElement extends HTMLElement {
    constructor() {
      super();

      //define your global variables
      //best used to define your element selectors
      //use data attributes when possible 
      this.MY_ELEMENT_SELECTOR = "[data-tab-selector]";
    }

    connectedCallback() {
      setTimeout(() => {
        //listener callback
        this.attachListeners();
      });
    }

    attachListeners() {
      //click example
      this.querySelectorAll(this.MY_ELEMENT_SELECTOR).forEach(
        (element) => {
          element.addEventListener(
            "click",
            this.handleMyEvent.bind(this, element)
          );
        }
      );
    }

    handleMyEvent(element) {
      console.log('My element clicked!', element);
    }
  }

  customElements.define("td-tabs-element", tabCustomElement);
}