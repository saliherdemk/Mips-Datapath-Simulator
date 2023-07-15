class Point {
  constructor(x, y, clr = colors.BLACK) {
    this.x = x;
    this.y = y;
    this.r = 12;
    this.color = clr;
  }

  draw() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r);
    noFill();
    stroke(colors.BLACK);
  }
}
