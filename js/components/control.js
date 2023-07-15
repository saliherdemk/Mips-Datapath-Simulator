class Control extends Component {
  constructor(x, y, text) {
    super(x, y, 50, 200, text, 2.5, 5);
    this.input;
    this.outputs = [];
    this.generateIO();
  }

  generateIO() {
    this.input = new Node(this.x, this.y + this.height / 2, false);
    for (let i = 1; i < 11; i++) {
      this.outputs.push(
        new Node(this.x + this.width, this.y + (this.height * i) / 11, false)
      );
    }
    nodes.push(this.input);
    nodes = nodes.concat(this.outputs);
  }

  update() {
    let opCode = this.input.value;
    // Normally, I made this component with combinational logic.
    // But then I relize that I need to show that if this signal is true, false or X(don't care)
    // Since there is no way to determinate weather if this signal X or not with combinational logic,
    // I reimplement this with brute force way. Sorry for this mess.

    this.outputs[0].changeValue(opCode == "000011"); //jal

    this.outputs[1].changeValue(opCode == "000000"); // regdest
    this.outputs[2].changeValue(opCode == "000010" || opCode == "000011"); //jump

    this.outputs[3].changeValue(opCode == "000100"); //branch
    this.outputs[4].changeValue(opCode == "100011"); //memread
    this.outputs[5].changeValue(opCode == "100011"); // memtoreg
    this.outputs[6].changeValue(
      ["000000"].includes(opCode)
        ? "10"
        : ["100011", "101011"].includes(opCode)
        ? "00"
        : opCode == "000100"
        ? "01"
        : "11" //X
    ); //aluop
    this.outputs[7].changeValue(opCode == "101011"); //memwrite
    this.outputs[8].changeValue(opCode != "000000" && opCode != "000100"); //alusrc
    this.outputs[9].changeValue(
      !["101011", "000010", "000100"].includes(opCode)
    ); //regwrite
  }

  drawText() {
    fill(5, 176, 239);
    noStroke();
    textSize(15);
    text(
      this.text,
      this.x + this.width / this.textXOffset,
      this.y + this.height / this.textYOffset
    );
    fill(255);
    stroke(0);
    strokeWeight(2);
  }

  show() {
    stroke(5, 176, 239);
    rect(this.x, this.y, this.width, this.height, 50);
  }
}
