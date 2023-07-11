class Mux extends Component {
  constructor(x, y, toTop = false, updateAddress = false) {
    super(x, y, 35, 80, "M\nU\nX", 3, 3);
    this.inputs = [];
    this.output;
    this.additionalInput;
    this.toTop = toTop;
    this.generateIO();
    this.updateAddress = updateAddress;
  }

  generateIO() {
    for (let i = 1; i < 3; i++) {
      this.inputs.push(
        new Node(this.x, this.y + (this.height * i) / 3, false, "left")
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

    nodes.push(this.additionalInput, this.output);
    nodes = nodes.concat(this.inputs);
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

    this.updateAddress && organizer.setCurrAddress(this.output.value);
  }

  show() {
    rect(this.x, this.y, this.width, this.height, 55);
  }
}
