export default class VHChromeFix {

  constructor(selectors) {

    this.selectors = selectors;
    let userAgent = navigator.userAgent.toLowerCase();
    this.isAndroidChrome = /chrome/.test(userAgent) && /android/.test(userAgent);
    this.isIOSChrome = /crios/.test(userAgent);

    this.init();
  }

  init() {

    let self = this;

    if (self.isAndroidChrome || self.isIOSChrome) {
      // If we detected Chrome on Android or iOS
      // Cache elements and trigger fix on init
      self.getElements(self.selectors);
      self.fixAll();

      // Cache window dimensions
      self.windowWidth = window.innerWidth;
      self.windowHeight = window.innerHeight;

      window.addEventListener('resize', function () {
        // Both width and height changed (orientation change)
        // This is a hack, as Android when keyboard pops up
        // Triggers orientation change
        self.windowWidth = window.innerWidth;
        self.windowHeight = window.innerHeight;
        self.fixAll();
      });
    }

  }

  getElements(selectors) {
    let self = this;

    self.elements = [];
    // Convert selectors to array if they are not
    selectors = Array.isArray(selectors) ? selectors : [selectors];

    for (let i = 0; i < selectors.length; i++) {
      // Get all elements for selector
      let selector = selectors[i].selector;
      let elements = document.querySelectorAll(selector);

      // Go through all elements for one selector to filter them
      for (let j = 0; j < elements.length; j++) {
        let offset = selectors[i].offset || 0;
        self.elements.push({
          domElement: elements[j],
          vh: selectors[i].vh,
          offset: offset
        });
      }
    }
  }

  fixAll() {
    let self = this;

    for (let i = 0; i < self.elements.length; i++) {
      let element = self.elements[i];
      let offset = element.offset;
      element.domElement.style.height = (window.innerHeight * (element.vh / 100) - offset) + 'px';
    }
  };
}
