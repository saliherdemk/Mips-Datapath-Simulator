class Alu extends Component {
  constructor(x, y, isAdd) {
    super(x, y, 100, 150, isAdd ? "Add" : "Alu", 2.5, 2);
    this.isAdd = isAdd;
    this.wires = [];
    this.inputs = [];
    this.outputs = [];
    this.additionalInput;
    this.generateIO();
  }

  generateIO() {
    if (!this.isAdd) {
      this.additionalInput = new Node(
        this.x + this.width / 2,
        this.y + this.height / 1.1,
        false,
        "bottom"
      );
      this.outputs.push(
        new Node(this.x + this.width, this.y + this.height / 3, false)
      );
      pathOrganizer.addNodes([this.additionalInput]);
    }
    this.outputs.push(
      new Node(
        this.x + this.width,
        this.y + this.height / (!this.isAdd ? 1.5 : 2),
        false,
        "right"
      )
    );

    this.inputs.push(new Node(this.x, this.y + 30, false));
    this.inputs.push(
      new Node(
        this.x,
        this.y + 120,
        false,
        this.additionalInput ? "right" : "top"
      )
    );

    let nodes = pathOrganizer
      .getNodes()
      .concat(this.outputs)
      .concat(this.inputs);
    pathOrganizer.setNodes(nodes);
  }

  updateDontCare() {
    let dontCare =
      this.outputs[0].isDontCare &&
      (this.outputs[1] ? this.outputs[1].isDontCare : true);
    this.inputs[0].setDontCare(dontCare);
    this.inputs[1].setDontCare(dontCare);
    this.additionalInput?.setDontCare(dontCare);
  }

  update() {
    let aluOp = this.isAdd ? "010" : this.additionalInput.value.toString();
    let inp1Val = this.inputs[0].value;
    let inp1 = binToDec(inp1Val);
    let inp2Val = this.inputs[1].value;
    let inp2 = binToDec(inp2Val);
    if (this.isAdd) {
      let val = dectoBin(inp1 + inp2, 32);
      this.outputs[0].changeValue(val);
      this.wires[0].isManuel &&
        (this.wires[0].endNode.changeValue(val) ||
          this.wires[1].endNode.changeValue(val.substring(0, 4)));
      return;
    }

    let result;

    switch (aluOp) {
      case "010":
        result = inp1 + inp2;
        break;
      case "110":
        result = inp1 - inp2;
        break;
      case "000":
        result = inp1 & inp2;
        break;
      case "001":
        result = inp1 | inp2;
        break;

      default:
        break;
    }
    this.outputs[0].changeValue(result == "00000");

    result = dectoBin(result, inp1Val.length + inp2Val.length > 12 ? 32 : 5);
    this.outputs[1].changeValue(result);
  }

  show() {
    beginShape();
    vertex(this.x, this.y);
    vertex(this.x + this.width, this.y + this.height / 5);
    vertex(this.x + this.width, this.y + (this.height * 4) / 5);
    vertex(this.x, this.y + this.height);
    vertex(this.x, this.y + (this.height * 2) / 3);
    vertex(this.x + this.width / 3, this.y + this.height / 2);
    vertex(this.x, this.y + this.height / 3);
    vertex(this.x, this.y);
    endShape();
  }
}
