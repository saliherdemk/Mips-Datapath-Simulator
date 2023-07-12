class DataMemory extends Component {
  constructor(x, y) {
    super(x, y, 120, 150, "Data Memory", 15, 1.1);
    this.inputs = [];
    this.output;
    this.additionalInputs = [];
    this.generateIO();
  }

  generateIO() {
    for (let i = 1; i < 3; i++) {
      this.inputs.push(
        new Node(this.x, this.y + (this.height * i) / 3, false, "right")
      );
    }

    this.output = new Node(
      this.x + this.width,
      this.y + this.height / 3,
      false
    );

    this.additionalInputs.push(
      new Node(this.x + this.width / 2, this.y, false),
      new Node(this.x + this.width / 2, this.y + this.height, false)
    );

    nodes = nodes.concat(this.inputs).concat(this.additionalInputs);
    nodes.push(this.output);
  }

  updateDontCare() {
    if (this.additionalInputs[0].value) {
      this.inputs[0].setDontCare(false);
      this.inputs[1].setDontCare(false);
      return;
    }
    let dontCare = this.output.isDontCare;
    this.inputs[0].setDontCare(dontCare);
    this.inputs[1].setDontCare(dontCare);
  }

  update() {
    if (this.additionalInputs[1].value) {
      this.output.changeValue(
        dectoBin(organizer.getMemValue(binToHex(this.inputs[0].value)))
      );
    }

    if (this.additionalInputs[0].value) {
      organizer.updateMemValue(
        binToHex(this.inputs[0].value),
        binToDec(this.inputs[1].value)
      );
      updateMemories();
    }
  }

  show() {
    rect(this.x, this.y, this.width, this.height);
  }
}
