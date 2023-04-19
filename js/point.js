class Point {
  constructor(x, y, r = 10) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  draw() {
    fill(0);
    ellipse(this.x, this.y, this.r);
    noFill();
  }
}
