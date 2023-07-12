class AndGate extends Component {
  constructor(x, y) {
    super(x, y, 55, 55, "And", 4.5, 1.7);
    this.x = x;
    this.y = y;
    this.inputs = [];
    this.output;
    this.generateIO();
  }

  generateIO() {
    this.inputs = [
      new Node(this.x, this.y + 10, false),
      new Node(this.x, this.y + 35, false),
    ];
    this.output = new Node(this.x + this.width, this.y + 25, false);

    nodes.push(this.inputs[0], this.inputs[1], this.output);
  }

  updateDontCare() {
    if (this.output.isDontCare) {
      this.inputs[0].setDontCare(true);
      this.inputs[1].setDontCare(true);
      return;
    }
    if (!this.inputs[0].value) {
      this.inputs[1].setDontCare(true);
      return;
    }
    !this.inputs[1].value && this.inputs[0].setDontCare(true);
  }

  update() {
    this.output.changeValue(this.inputs[0].value && this.inputs[1].value);
  }

  show() {
    noFill();
    arc(
      this.x + 26,
      this.y + 26,
      this.width,
      this.height,
      radians(-85),
      radians(85)
    );
    beginShape();
    vertex(this.x + 30, this.y - 1);
    vertex(this.x, this.y - 1);
    vertex(this.x, this.y + this.height - 2);
    vertex(this.x + 30, this.y + this.height - 2);

    endShape();
  }
}
