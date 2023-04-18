class Wire {
  constructor(startNode, endNode) {
    this.startNode = startNode;
    this.endNode = endNode;
  }

  draw() {
    beginShape();
    vertex(this.startNode.x, this.startNode.y);
    vertex(this.startNode.x + 25, this.startNode.y);
    vertex(this.startNode.x + 25, this.endNode.y);
    vertex(this.endNode.x, this.endNode.y);
    endShape();
  }
}
