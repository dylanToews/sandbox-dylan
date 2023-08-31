if (!customElements.get("swiper-slider")) {
  class SwiperSlider extends HTMLElement {
    constructor() {
      super();
      this.slideContainer = this.querySelector("[data-swiper]:not([data-swiper-thumbs])");
      this.slides = this.querySelectorAll("[data-swiper-slide]");
      this.sliderOptions = this.applyDefaultOptions(this.getSliderOptions());
      this.activeIndex = 0;
      this.initialized = false;
      if (this.dataset.swiperThumbs) {
        this.thumbnails = this.querySelector('[data-swiper-thumbs]');
      }
      if (this.dataset.customEvent) {
        this.attachCustomListeners(this.dataset.customEvent);
      }
      if (this.slideContainer && this.slides.length > 0) {
        document.addEventListener(
          "DOMContentLoaded",
          this.initializeSwiper.bind(this)
        );
        document.addEventListener(
          "shopify:section:load",
          this.initializeSwiper.bind(this)
        );
        window.addEventListener("resize", this.handleResize.bind(this));
      } else {
        console.warn("SwiperSlider - Slider or Slides Not Found");
      }
    }
    attachCustomListeners(customEvent) {
      switch (customEvent) {
        case "swiper_event":
          document.addEventListener("swiper_event", this.updateSlides.bind(this));
          break;
      }
    }
    updateSlides(event) {
    }
    applyDefaultOptions(options) {
      if (options.loop === undefined) {
        options.loop = true;
      }
      options.speed = 400;
      return options;
    }

    getSliderOptions() {
      try {
        return JSON.parse(this.dataset.swiperOptions);
      } catch (err) {
        console.log(err);
        return {};
      }
    }

    initializeSwiper() {
      if (window.Swiper && !this.initialized) {
        this.initialized = true;
        if(this.thumbnails) {
          this.setThumbnails()
        }
        this.slider = new Swiper(this.slideContainer, this.sliderOptions);
        this.initializeSliderEventListeners();
      } else if (!window.Swiper) {
        console.warn("SwiperSlider - Swiper.js not found");
      }
    }

    handleResize(e) {
      if (this.slider) {
        setTimeout(() => {
          this.slider.updateSize();
        }, 300);
      }
    }

    setThumbnails() {
      const thumbsSlideContainer = this.thumbnails;
      const thumbOptions = JSON.parse(this.thumbnails.dataset.swiperOptions);
      const thumbnailsSlider = new Swiper(thumbsSlideContainer, thumbOptions);
      this.sliderOptions.thumbs = {swiper: thumbnailsSlider};
    }

    initializeSliderEventListeners() {}
  }
  customElements.define("swiper-slider", SwiperSlider);
  
}
