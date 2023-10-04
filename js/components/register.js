class Registers extends Component {
  constructor(x, y) {
    super(x, y, 120, 150, "Registers", 4, 1.1);
    this.inputs = [];
    this.outputs = [];
    this.additionalInput;
    this.generateIO();
  }

  generateIO() {
    for (let i = 0; i < 4; i++) {
      this.inputs.push(
        new Node(
          this.x,
          this.y + 20 + i * 30,
          false,
          i == 3 ? "bottom" : "right"
        )
      );
    }

    for (let i = 1; i < 3; i++) {
      this.outputs.push(
        new Node(this.x + this.width, this.y + (this.height * i) / 3, false)
      );
    }

    this.additionalInput = new Node(this.x + this.width / 2, this.y, false);
    pathOrganizer.addNodes([this.additionalInput]);
    let nodes = pathOrganizer
      .getNodes()
      .concat(this.inputs)
      .concat(this.outputs);
    pathOrganizer.setNodes(nodes);
  }

  updateDontCare() {
    for (let i = 0; i < 2; i++) {
      this.outputs[i].isDontCare && this.inputs[i].setDontCare(true);
    }
  }

  update(writeToReg = false) {
    this.additionalInput.setDontCare(this.inputs[2].value == "00000");
    this.inputs[2].setDontCare(
      !this.additionalInput.value || this.additionalInput.isDontCare
    );
    this.inputs[3].setDontCare(
      !this.additionalInput.value || this.additionalInput.isDontCare
    );
    let regValues = organizer.getRegValues();
    this.outputs[0].changeValue(
      dectoBin(regValues[binToDec(this.inputs[0].value) - 1], 32)
    );
    this.outputs[1].changeValue(
      dectoBin(regValues[binToDec(this.inputs[1].value) - 1], 32)
    );

    if (writeToReg && this.additionalInput.value) {
      regValues[binToDec(this.inputs[2].value) - 1] = binToDec(
        this.inputs[3].value
      ).toString();

      registerInputs.updateRegisters(regValues);
    }
  }

  show() {
    rect(this.x, this.y, this.width, this.height);
  }
}
