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

        const headingElements = document.querySelectorAll(this.heading_selector);
        const contentElements = document.querySelectorAll(this.content_selector)  
        // Hide all content elements
          contentElements.forEach((contentElement, i) => {
            contentElement.setAttribute("hidden", "true");
          });
        
        headingElements.forEach((element, index) => {
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
      const contentElements = document.querySelectorAll(this.content_selector)  
    // Hide all content elements
      contentElements.forEach((contentElement, i) => {
        contentElement.setAttribute("hidden", "true");
      });

      // Show the content for the initially active tab
      contentElements[index].removeAttribute("hidden");
    }

    setActiveTab(index) {
      const headingElements = document.querySelectorAll(this.heading_selector);

      // Remove aria-selected from the currently active tab
      headingElements[this.activeIndex].removeAttribute("aria-selected");
      headingElements[this.activeIndex].setAttribute("tabindex", "-1");

      // Set aria-selected and tabindex to the newly active tab
      headingElements[index].setAttribute("aria-selected", "true");
      headingElements[index].setAttribute("tabindex", "0");

      this.setActiveContent(index);
      this.activeIndex = index;      
    }
  }

  customElements.define("td-tabs-element", tabCustomElement);
}