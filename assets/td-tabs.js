//check if element already exists
if (!customElements.get("td-tabs-element")) {
  class tabCustomElement extends HTMLElement {
    constructor() {
      super();     
      this.heading_selector = "[data-tab-heading]";
      this.content_selector = "[data-tab-content]";
      this.activeIndex = 0;
    }
    connectedCallback() {
      setTimeout(() => {
        this.attachListeners();
      });
    }
    attachListeners() {
      this.querySelectorAll(this.heading_selector).forEach((element, index) => {
        element.addEventListener("click", (event) => {
          this.setActiveTab(index);
        });
      });
    }
    setActiveContent(index) {
      const contentElements = document.querySelectorAll(this.content_selector)  
      if (contentElements[index].hasAttribute("hidden")) {
        contentElements[index].removeAttribute("hidden");
      } else {
        contentElements[index].setAttribute("hidden", "true");
      }
    }
    setActiveTab(index) {
      const headingElements = document.querySelectorAll(this.heading_selector);
      headingElements[this.activeIndex].setAttribute("aria-selected", "true");
      headingElements[index].setAttribute("aria-selected", "false");
      this.setActiveContent(index);
      this.activeIndex = index;      
    }
  }

  customElements.define("td-tabs-element", tabCustomElement);
}