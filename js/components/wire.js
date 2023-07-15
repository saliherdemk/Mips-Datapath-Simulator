class Wire {
  constructor({
    startNode,
    endNode,
    backwards = false,
    wireColor = 0,
    text = "",
    textXOffset = 0,
    textYOffset = 0,
    isManuel = false,
    isGradient = false,
  }) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.backwards = backwards;
    this.wireColor = wireColor;
    this.text = text;
    this.textXOffset = textXOffset;
    this.textYOffset = textYOffset;
    this.isManuel = isManuel;
    this.isGradient = isGradient;
  }

  update() {
    !this.isManuel && this.endNode.changeValue(this.startNode.value);
  }

  drawText() {
    fill(this.wireColor);
    textSize(13);
    text(
      this.text,
      this.startNode.x + this.textXOffset,
      this.startNode.y + this.textYOffset
    );
    noFill();
    stroke(colors.BLACK);
    strokeWeight(2);
  }

  draw() {
    this.isGradient
      ? gradientLine(
          this.startNode.x,
          this.startNode.y,
          this.endNode.x,
          this.endNode.y,
          colors.BLACK,
          this.wireColor
        )
      : stroke(this.wireColor);
    beginShape();
    vertex(this.startNode.x, this.startNode.y);
    vertex(this.startNode.x + (this.backwards ? 0 : 25), this.startNode.y);
    vertex(this.startNode.x + (this.backwards ? 0 : 25), this.endNode.y);
    vertex(this.endNode.x, this.endNode.y);
    endShape();
    stroke(colors.BLACK);
    this.drawText();
  }
}
