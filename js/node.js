class Node {
  constructor(x, y, value = false) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.colorValue = color(255, 0, 0);
    this.isPopupOpen = false;
    this.rollover = false;
    this.hasValue = false;
  }

  changeValue(value) {
    // only color will change
    // value must be identical with normal cpu (combinational logic)
    this.value = value;
    this.hasValue = value !== false && value !== true;
    this.colorValue = this.hasValue
      ? value == "X"
        ? color(0, 255, 255)
        : color(0, 0, 255)
      : this.value
      ? color(0, 255, 0)
      : color(255, 0, 0);
  }

  showValue() {
    fill(0);
    noStroke();
    textSize(15);
    text(this.value, this.x - 15, this.y);
    fill(255);
    stroke(0);
    strokeWeight(2);
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
    }
  }

  showPopup() {
    let width = this.value.length * 10 + 50;

    fill(255);
    rect(this.x - width / 2, this.y - 50, width, 40, 20);
    fill(0);
    noStroke();
    textSize(15);
    text(this.value, this.x - width / 2 + 25, this.y - 25);
    fill(255);
    stroke(0);
    strokeWeight(2);
    noFill();
  }

  show() {
    fill(this.colorValue);
    ellipse(this.x, this.y, 14);
    noFill();
    this.hasValue && (this.isPopupOpen || this.rollover) && this.showPopup();
  }

  draw() {
    this.show();
    this.update();
  }
}
