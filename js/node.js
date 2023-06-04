class Node {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
  }

  changeValue(value) {
    this.value = value;
  }

  show() {
    fill(
      this.value === true
        ? color(0, 255, 0)
        : this.value === false || this.value === undefined
        ? color(255, 0, 0)
        : color(0, 0, 255)
    );
    ellipse(this.x, this.y, 14);
    noFill();
  }

  draw() {
    this.show();
  }
}
