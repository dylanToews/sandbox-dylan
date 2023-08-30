//check if element already exists
if (!customElements.get("td-tabs-element")) {
  class tabCustomElement extends HTMLElement {
    constructor() {
      super();     
      this.heading_selector = "[data-tab-heading]";
      this.content_selector = "[data-tab-content]";
      this.headingElements = [];
      this.contentElements = [];
    }

    connectedCallback() {
      setTimeout(() => {
        this.attachListeners();
        this.headingElements = document.querySelectorAll(this.heading_selector);
        this.contentElements = document.querySelectorAll(this.content_selector)  

        this.contentElements.forEach((contentElement, i) => {
            contentElement.setAttribute("hidden", "true");
          });
        this.headingElements.forEach((element, index) => {
          if(element.getAttribute("aria-selected") === "true") {
            this.activeIndex = index;
            this.setActiveTab(this.activeIndex);
          }
        }) 
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
      this.contentElements.forEach((contentElement, i) => {
        contentElement.setAttribute("hidden", "true");
      });
      this.contentElements[index].removeAttribute("hidden");
    }

    setActiveTab(index) {  
      this.headingElements[this.activeIndex].removeAttribute("aria-selected");
      this.headingElements[this.activeIndex].setAttribute("tabindex", "-1");

      this.headingElements[index].setAttribute("aria-selected", "true");
      this.headingElements[index].setAttribute("tabindex", "0");

      this.setActiveContent(index);
      this.activeIndex = index;      
    }
  }

  customElements.define("td-tabs-element", tabCustomElement);
}