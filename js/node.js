class Node {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
  }

  show() {
    ellipse(this.x, this.y, 14);
  }

  draw() {
    this.show();
  }
}
