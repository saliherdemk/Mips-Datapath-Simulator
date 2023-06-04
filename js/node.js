class Node {
  constructor(x, y, value = false) {
    this.x = x;
    this.y = y;
    this.value = value;
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
    hasValue && this.showValue();
  }

  draw() {
    this.show();
  }
}
