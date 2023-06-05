class Node {
  constructor(x, y, value = false) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.isPopupOpen = false;
    this.rollover = false;
  }

  changeValue(value) {
    this.value = value;
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
    let hasValue = this.value !== false && this.value !== true;
    fill(
      hasValue
        ? color(0, 0, 255)
        : this.value
        ? color(0, 255, 0)
        : color(255, 0, 0)
    );
    ellipse(this.x, this.y, 14);
    noFill();
    hasValue && (this.isPopupOpen || this.rollover) && this.showPopup();
  }

  draw() {
    this.show();
    this.update();
  }
}
