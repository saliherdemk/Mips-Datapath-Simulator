class Mux extends Component {
  constructor(x, y, toTop = false) {
    super(x, y, 35, 80, "M\nU\nX", 3, 3);
    this.inputs = [];
    this.output;
    this.additionalInput;
    this.toTop = toTop;
    this.generateIO();
  }

  generateIO() {
    for (let i = 1; i < 3; i++) {
      this.inputs.push(
        new Node(
          this.x,
          this.y + (this.height * i) / 3,
          false,
          i == "2" ? "bottom" : "left"
        )
      );
    }

    this.output = new Node(
      this.x + this.width,
      this.y + this.height / 3,
      false
    );

    this.additionalInput = new Node(
      this.x + this.width / 2,
      this.y + (this.toTop ? 0 : this.height),
      false
    );

    pathOrganizer.addNodes([this.additionalInput, this.output]);
    let nodes = pathOrganizer.getNodes().concat(this.inputs);
    pathOrganizer.setNodes(nodes);
  }

  updateDontCare() {
    if (this.output.isDontCare) {
      this.inputs[0].setDontCare(true);
      this.inputs[1].setDontCare(true);
      this.additionalInput.setDontCare(true);
    }
  }

  update() {
    const inputIndex = this.additionalInput.value
      ? this.toTop
        ? 0
        : 1
      : this.toTop
      ? 1
      : 0;
    this.output.changeValue(this.inputs[inputIndex].value);
    this.inputs[+!inputIndex].setDontCare(true);
    this.inputs[+inputIndex].setDontCare(false);
  }

  show() {
    rect(this.x, this.y, this.width, this.height, 55);
  }
}
