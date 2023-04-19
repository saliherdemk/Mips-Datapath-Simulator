class Wire {
  constructor(startNode, endNode, backwards = false) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.backwards = backwards;
  }

  draw() {
    beginShape();
    vertex(this.startNode.x, this.startNode.y);
    vertex(this.startNode.x + (this.backwards ? 0 : 25), this.startNode.y);
    vertex(this.startNode.x + (this.backwards ? 0 : 25), this.endNode.y);
    vertex(this.endNode.x, this.endNode.y);
    endShape();
  }
}
