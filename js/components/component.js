class Component {
  constructor(x, y, w, h, text, textXOffset, textYOffset) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.text = text;
    this.textXOffset = textXOffset;
    this.textYOffset = textYOffset;
    this.wires = [];
  }

  setWires(wires) {
    this.wires = wires;
  }

  updateDontCare() {
    null;
  }

  updateWires() {
    for (let i = 0; i < this.wires.length; i++) {
      this.wires[i].update();
    }
  }

  drawText() {
    fill(colors.BLACK);
    noStroke();
    textSize(15);
    text(
      this.text,
      this.x + this.width / this.textXOffset,
      this.y + this.height / this.textYOffset
    );
    fill(colors.WHITE);
    stroke(colors.BLACK);
    strokeWeight(2);
  }

  draw() {
    this.show();
    this.drawText();
  }
}
