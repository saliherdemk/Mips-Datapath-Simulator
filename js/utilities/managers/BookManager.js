class BookManager {
  constructor() {
    this.offsetX;
    this.offsetY;
    this.init();
  }

  // Since we try to use ina  class, all event listener functions must be inside binded.
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

  init() {
    this.drag = this.drag.bind(this);
    this.mouseDownDraggable = this.mouseDownDraggable.bind(this);
    this.initResize = this.initResize.bind(this);
    this.resize = this.resize.bind(this);
    this.stopResize = this.stopResize.bind(this);

    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", this.drag);
    });

    document
      .getElementById("draggable-book")
      .addEventListener("mousedown", this.mouseDownDraggable);

    document
      .getElementById("resizer")
      .addEventListener("mousedown", this.initResize);

    document
      .getElementById("shrink-book")
      .addEventListener("click", this.shrinkBook);
  }

  // Resizer for Adress Book (https://jsfiddle.net/pksurya/uhd963xa/30/)
  initResize() {
    window.addEventListener("mousemove", this.resize);
    window.addEventListener("mouseup", this.stopResize);
  }

  resize(e) {
    addressBookContainer.style.width =
      Math.max(e.clientX - addressBookContainer.offsetLeft, 330) + "px";
    addressBookContainer.style.height =
      Math.max(e.clientY - addressBookContainer.offsetTop, 95) + "px";
  }

  stopResize() {
    window.removeEventListener("mousemove", this.resize);
    window.removeEventListener("mouseup", this.stopResize);
  }

  shrinkBook() {
    addressBookContainer.style.width = "330px";
    addressBookContainer.style.height = "95px";
    addressBookContainer.style.top = "0px";
    addressBookContainer.style.left = "0px";
  }

  // Draggable Address Book
  mouseDownDraggable(e) {
    this.offsetX = e.clientX - addressBookContainer.offsetLeft;
    this.offsetY = e.clientY - addressBookContainer.offsetTop;
    window.addEventListener("mousemove", this.drag);
  }

  drag(e) {
    addressBookContainer.style.left = e.clientX - this.offsetX + "px";
    addressBookContainer.style.top = e.clientY - this.offsetY + "px";
  }
}
