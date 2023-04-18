class Node {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
  }

  show() {
    fill(this.value ? color(0, 255, 0) : color(255, 0, 0));
    ellipse(this.x, this.y, 14);
    noFill();
  }

  draw() {
    this.show();
  }
}
