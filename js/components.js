class Component {
  constructor(x, y, w, h, text, textXOffset, textYOffset) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.text = text;
    this.textXOffset = textXOffset;
    this.textYOffset = textYOffset;
  }

  drawText() {
    fill(0);
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

  draw() {
    this.show();
    this.drawText();
  }
}

class Pc extends Component {
  constructor(x, y) {
    super(x, y, 50, 150, "PC", 3, 2);
    this.input;
    this.output;
    this.generateIO();
  }

  generateIO() {
    this.input = new Node(this.x, this.y + this.height / 2, false);
    this.output = new Node(
      this.x + this.width,
      this.y + this.height / 2,
      false
    );
    nodes.push(this.input, this.output);
  }

  show() {
    rect(this.x, this.y, this.width, this.height);
  }
}

class Alu extends Component {
  constructor(x, y, isAdd) {
    super(x, y, 100, 150, isAdd ? "Add" : "Alu", 2.5, 2);
    this.isAdd = isAdd;
    this.inputs = [];
    this.outputs = [];
    this.additionalInput;
    this.generateIO();
  }

  generateIO() {
    if (!this.isAdd) {
      this.additionalInput = new Node(
        this.x + this.width / 2,
        this.y + this.height / 1.1
      );
      this.outputs.push(
        new Node(this.x + this.width, this.y + this.height / 3, false)
      );
      nodes.push(this.additionalInput);
    }
    this.outputs.push(
      new Node(
        this.x + this.width,
        this.y + this.height / (!this.isAdd ? 1.5 : 2),
        false
      )
    );

    this.inputs.push(new Node(this.x, this.y + 30, false));
    this.inputs.push(new Node(this.x, this.y + 120, false));
    nodes = nodes.concat(this.outputs).concat(this.inputs);
  }

  update() {
    let aluOp = this.isAdd ? "010" : this.additionalInput.value.toString();
    let inp1 = binToDec(this.inputs[0].value);
    let inp2 = binToDec(this.inputs[1].value);

    let result;
    if (!inp1 || !inp2 || inp1 == "X" || inp2 == "X") {
      this.outputs[0].changeValue(false);
      this.outputs[1].changeValue("X");
      return;
    }

    switch (aluOp) {
      case "010":
        result = inp1 + inp2;
        break;
      case "110":
        // sub and beq
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
    this.outputs[1].changeValue(dectoBin(result, 5));
  }

  show() {
    this.inputs[0].value && this.update();
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

class InstructionMemory extends Component {
  constructor(x, y) {
    super(x, y, 100, 150, "Instruction\nMemory", 4, 1.2);
    this.input;
    this.output;
    this.generateIO();
    this.wires = [];
  }

  setWires(wires) {
    this.wires = wires;
  }

  generateIO() {
    this.input = new Node(this.x, this.y + this.height / 2, false);
    this.output = new Node(
      this.x + this.width,
      this.y + this.height / 2,
      false
    );

    nodes.push(this.input, this.output);
  }

  update() {
    let type = this.input.value[1];
    let codeArr = this.input.value[0];
    if (type == "R") {
      this.wires[0].endNode.changeValue("X");

      this.wires[1].endNode.changeValue(
        codeArr[0] + (codeArr?.[5] == "001000" ? "t" : "f")
      );
      this.wires[2].endNode.changeValue(codeArr[1]);
      this.wires[3].endNode.changeValue(codeArr[2]);
      this.wires[4].endNode.changeValue(codeArr[3]);
      this.wires[5].endNode.changeValue("X");
      this.wires[6].endNode.changeValue(codeArr[5]);
    } else if (type == "I") {
      this.wires[0].endNode.changeValue("X");

      this.wires[1].endNode.changeValue(codeArr[0]);
      this.wires[2].endNode.changeValue(codeArr[1]);
      this.wires[3].endNode.changeValue(codeArr[2]);
      this.wires[4].endNode.changeValue("X");
      this.wires[5].endNode.changeValue(codeArr[3]);
      this.wires[6].endNode.changeValue("X");
    } else {
      this.wires[0].endNode.changeValue(codeArr[1]);

      this.wires[1].endNode.changeValue(codeArr[0]);
      this.wires[2].endNode.changeValue("X");
      this.wires[3].endNode.changeValue("X");
      this.wires[4].endNode.changeValue("X");
      this.wires[5].endNode.changeValue("X");
    }
    for (let i = 2; i < 5; i++) {
      let el = wires[i].endNode;
      el.changeValue(el.value == "X" || el.value == "00000" ? false : el.value);
    }
  }

  show() {
    this.input.value && this.update();
    rect(this.x, this.y, this.width, this.height);
  }
}

class Registers extends Component {
  constructor(x, y) {
    super(x, y, 100, 150, "Registers", 4, 1.1);
    this.inputs = [];
    this.outputs = [];
    this.additionalInput;
    this.generateIO();
  }

  generateIO() {
    for (let i = 0; i < 4; i++) {
      this.inputs.push(new Node(this.x, this.y + 20 + i * 30, false));
    }

    for (let i = 1; i < 3; i++) {
      this.outputs.push(
        new Node(this.x + this.width, this.y + (this.height * i) / 3, false)
      );
    }

    this.additionalInput = new Node(this.x + this.width / 2, this.y, false);
    nodes.push(this.additionalInput);
    nodes = nodes.concat(this.inputs).concat(this.outputs);
  }

  update() {
    // console.log(regValues[binToDec(this.inputs[0].value) - 1]);
    let decValue1 = regValues[binToDec(this.inputs[0].value) - 1];
    this.outputs[0].changeValue(dectoBin(decValue1, 5));
    //  && this.inputs[2].value
    if (this.inputs[1].value !== "X") {
      let decValue2 = regValues[binToDec(this.inputs[1].value) - 1];
      this.outputs[1].changeValue(dectoBin(decValue2, 5));
      return;
    }
    this.outputs[1].changeValue("X");
  }

  show() {
    this.inputs[0].value && this.update();
    rect(this.x, this.y, this.width, this.height);
  }
}

class DataMemory extends Component {
  constructor(x, y) {
    super(x, y, 100, 150, "Data Memory", 15, 1.1);
    this.inputs = [];
    this.output;
    this.additionalInputs = [];
    this.generateIO();
  }

  generateIO() {
    for (let i = 1; i < 3; i++) {
      this.inputs.push(new Node(this.x, this.y + (this.height * i) / 3, false));
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

  show() {
    rect(this.x, this.y, this.width, this.height);
  }
}

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
      this.inputs.push(new Node(this.x, this.y + (this.height * i) / 3, false));
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

  update() {
    if (this.additionalInput.value == "X") {
      this.output.changeValue("X");
      return;
    }
    if (this.additionalInput.value) {
      this.output.changeValue(
        this.toTop ? this.inputs[0].value : this.inputs[1].value
      );
      return;
    }
    this.output.changeValue(
      this.toTop ? this.inputs[1].value : this.inputs[0].value
    );
  }

  show() {
    this.update();
    rect(this.x, this.y, this.width, this.height, 55);
  }
}

class Ellipse extends Component {
  constructor(x, y, text, hasAdditional = false) {
    super(x, y, 66, 66, text, 7, 2.5);
    this.input;
    this.output;
    this.hasAdditional = hasAdditional;
    this.additionalInput;
    this.generateIO();
  }

  generateIO() {
    if (this.hasAdditional) {
      this.additionalInput = new Node(
        this.x + this.width / 2,
        this.y + this.height,
        false
      );
      nodes.push(this.additionalInput);
    }
    this.input = new Node(this.x, this.y + this.height / 2, false);
    this.output = new Node(
      this.x + this.width,
      this.y + this.height / 2,
      false
    );
    nodes.push(this.input, this.output);
  }

  update() {
    // https://www.comp.nus.edu.sg/~adi-yoga/CS2100/ch08c2/
    // https://www.cs.princeton.edu/courses/archive/fall15/cos375/lectures/08-Control-3x1.pdf
    let value = this.input.value;

    if (this.text == "Shift\nLeft 2") {
      this.output.changeValue(value.slice(2) + value.slice(0, 2));
    } else if (this.text == "Sign\nExtend") {
      this.output.changeValue(
        value == "X" ? "X" : value[0].repeat(32 - value.length) + value
      );
    } else if ((this.text = "Alu\nControl")) {
      let aluop1 = this.additionalInput.value[0] == "1"; // t
      let aluop0 = this.additionalInput.value[1] == "1"; // f
      let f0 = value[5] == "1"; // t
      let f1 = value[4] == "1"; //f
      let f2 = value[3] == "1"; //t
      let f3 = value[2] == "1"; //f

      let op3 = "";
      let op2 = (f1 && aluop1) || aluop0; // 0
      let op1 = !f2 || !aluop1; // 0
      let op0 = (f0 || f3) && aluop1; // 0

      // console.log(op3, op2, op1, op0);
      // 0 0 1 0
      // 3 2 1 0

      this.output.changeValue(op3 + +op2 + +op1 + +op0);
    }
  }

  show() {
    this.input.value && this.update();
    rect(this.x, this.y, this.width, this.height, 50);
  }
}

class Control extends Component {
  constructor(x, y, text) {
    super(x, y, 50, 200, text, 2.5, 5);
    this.input;
    this.outputs = [];
    this.generateIO();
  }

  generateIO() {
    this.input = new Node(this.x, this.y + this.height / 2, false);
    for (let i = 1; i < 10; i++) {
      this.outputs.push(
        new Node(this.x + this.width, this.y + (this.height * i) / 10, false)
      );
    }
    nodes.push(this.input);
    nodes = nodes.concat(this.outputs);
  }

  update() {
    let opCode = this.input.value.slice(0, 6);
    let isJr = this.input.value[this.input.value.length - 1] == "t";
    // Normally, I made this component with combinational logic.
    // But then I relize that I need to show that if this signal is true, false or X(don't care)
    // Since there is no way to determinate weather if this signal X or not with combinational logic,
    // I reimplement this with brute force way. Sorry for this mess.

    // this.outputs[5].value = opCode == "100011" || opCode == "101011"? "00":
    // opCode == "000100"? "01" :
    // ;

    if (isJr) {
      this.outputs[0].changeValue("X");
      this.outputs[1].changeValue(false);
      this.outputs[2].changeValue(false);
      this.outputs[3].changeValue("X");
      this.outputs[4].changeValue("X");
      this.outputs[5].changeValue("X");
      this.outputs[6].changeValue(false);
      this.outputs[7].changeValue("X");
      this.outputs[8].changeValue(false);
      return;
    }
    //sw        beq       j
    if (["101011", "000100", "000010"].includes(opCode)) {
      this.outputs[0].changeValue("X");
      this.outputs[1].changeValue(opCode == "000010");
      this.outputs[2].changeValue(
        opCode == "000010" ? "X" : opCode == "000100"
      );
      this.outputs[3].changeValue(opCode == false);
      this.outputs[4].changeValue(opCode == "X");
      this.outputs[5].changeValue(
        opCode == "000010" ? "X" : opCode == "101011" ? "00" : "01"
      );
      this.outputs[6].changeValue(opCode == "101011");
      this.outputs[7].changeValue(
        opCode == "000010" ? "X" : opCode == "101011"
      );
      this.outputs[8].changeValue(false);
      return;
    }
    this.outputs[0].changeValue(opCode == "000000");
    this.outputs[1].changeValue(opCode == "000010" || opCode == "000011");
    this.outputs[2].changeValue(opCode == "000100");
    this.outputs[3].changeValue(opCode == "100011");
    this.outputs[4].changeValue(opCode == "100011");
    this.outputs[5].changeValue(
      opCode == "100011" || opCode == "101011"
        ? "00"
        : opCode == "000100"
        ? "01"
        : opCode == "000010" || opCode == "000011" || opCode == "001000"
        ? "X"
        : "10"
    );
    this.outputs[6].changeValue(opCode == "101011");
    this.outputs[7].changeValue(opCode != "000000" && opCode != "000100");
    this.outputs[8].changeValue(
      opCode != "101011" && opCode != "000100" && opCode != "000010"
    );
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
    this.input.value && this.update();
    stroke(5, 176, 239);
    rect(this.x, this.y, this.width, this.height, 50);
  }
}

class AndGate extends Component {
  constructor(x, y) {
    super(x, y, 55, 55, "And", 4.5, 1.7);
    this.x = x;
    this.y = y;
    this.input1;
    this.input2;
    this.output;
    this.generateIO();
  }

  generateIO() {
    this.input1 = new Node(this.x, this.y + 10, false);
    this.input2 = new Node(this.x, this.y + 35, false);
    this.output = new Node(this.x + this.width, this.y + 25, false);

    nodes.push(this.input1, this.input2, this.output);
  }

  updateNode() {
    this.output.changeValue(this.input2.value && this.input1.value);
  }

  show() {
    this.input2 && this.updateNode();
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
