class Component {
  constructor(x, y, w, h, text, textXOffset, textYOffset) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.text = text;
    this.textXOffset = textXOffset;
    this.textYOffset = textYOffset;
    this.isVisited = false;
    this.wires = [];
  }

  setWires(wires) {
    this.wires = wires;
  }

  updateDontCare() {}
  updateWires() {
    for (let i = 0; i < this.wires.length; i++) {
      this.wires[i].update();
    }
  }

  drawText() {
    fill(0);
    noStroke();
    textSize(15);
    text(
      this.text,
      this.x + this.width / this.textXOffset,
      this.y + this.height / this.textYOffset
    );
    fill(255);
    stroke(0);
    strokeWeight(2);
  }

  draw() {
    this.show();
    this.drawText();
    this.isVisited &&
      text(
        "OK",
        this.x + this.width / this.textXOffset,
        this.y + this.height / this.textYOffset
      );
  }
}
