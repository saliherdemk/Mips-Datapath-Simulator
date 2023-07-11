class Node {
  constructor(x, y, value = false) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.colorValue = color(255, 0, 0);
    this.isPopupOpen = false;
    this.rollover = false;
    this.hasValue = false;
    this.isDontCare = false;
    this.wires = [];
    this.changeValue(value);
  }

  setDontCare(value) {
    this.isDontCare = value;
    if (this.isDontCare) {
      this.wires?.forEach((w) => {
        if (!w.endNode.isDontCare) {
          this.setDontCare(false);
          return;
        }
      });
      let nodeWires = findWiresByEndNode(this);

      nodeWires?.startNode.setDontCare(true);
    }
    this.changeValue(this.value);
  }

  changeValue(value) {
    this.value = value;
    this.hasValue = value !== false && value !== true;
    this.colorValue = this.isDontCare
      ? color(0, 255, 255)
      : this.hasValue
      ? color(0, 0, 255)
      : this.value
      ? color(0, 255, 0)
      : color(255, 0, 0);
  }

  setWires(wires) {
    this.wires = wires;
  }

  dist() {
    return (this.x - mouseX) ** 2 + (this.y - mouseY) ** 2;
  }

  update() {
    let d = this.dist();
    this.rollover = d < 40 && d > 0;
  }

  onClick() {
    if (this.rollover) {
      this.isPopupOpen = !this.isPopupOpen;
      this.rollover = false;
    }
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  showPopup() {
    let val = this.value.length > 6 ? binToHex(this.value) : this.value;
    let width = val.length * 10 + 50;

    fill(255);
    rect(this.x - width / 2, this.y - 50, width, 40, 20);
    fill(0);
    noStroke();
    textSize(15);
    text(val, this.x - width / 2 + 25, this.y - 25);
    fill(255);
    stroke(0);
    strokeWeight(2);
    noFill();
  }

  show() {
    fill(this.colorValue);
    ellipse(this.x, this.y, 14);
    if (this.isDontCare && !this.hasValue) {
      strokeWeight(1);
      fill(this.value ? color(0, 255, 0) : color(255, 0, 0));
      arc(this.x, this.y, 14, 14, HALF_PI, PI + HALF_PI, PIE);
    }
    strokeWeight(2);

    noFill();
    this.hasValue && (this.isPopupOpen || this.rollover) && this.showPopup();
  }

  draw() {
    this.show();
    this.update();
  }
}
