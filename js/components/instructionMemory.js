class InstructionMemory extends Component {
  constructor(x, y) {
    super(x, y, 100, 150, "Instruction\nMemory", 4, 1.2);
    this.input;
    this.output;
    this.generateIO();
    this.wires = [];
  }

  generateIO() {
    this.input = new Node(this.x, this.y + this.height / 2, false);
    this.output = new Node(
      this.x + this.width,
      this.y + this.height / 2,
      false
    );

    pathOrganizer.addNodes([this.input, this.output]);
  }

  update() {
    let code = addressOrganizer
      .getAddressValue(this.input.value)
      .replaceAll(" ", "");
    console.log(code);
    this.output.changeValue(code);
    this.wires[0].endNode.changeValue(code.substring(6));
    this.wires[1].endNode.changeValue(code.substring(0, 6));
    this.wires[2].endNode.changeValue(code.substring(6, 11));
    this.wires[3].endNode.changeValue(code.substring(11, 16));
    this.wires[4].endNode.changeValue(code.substring(16, 21));
    this.wires[5].endNode.changeValue(code.substring(16));
    this.wires[6].endNode.changeValue(code.substring(26));
  }

  show() {
    rect(this.x, this.y, this.width, this.height);
  }
}
