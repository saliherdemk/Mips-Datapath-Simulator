class Component {
  constructor(x, y, w, h, text, textXOffset, textYOffset) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.text = text;
    this.textXOffset = textXOffset;
    this.textYOffset = textYOffset;
    this.isVisited = false;
    this.wires = [];
  }

  setWires(wires) {
    this.wires = wires;
  }

  updateWires() {
    for (let i = 0; i < this.wires.length; i++) {
      this.wires[i].update();
    }
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
    this.isVisited &&
      text(
        "OK",
        this.x + this.width / this.textXOffset,
        this.y + this.height / this.textYOffset
      );
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
    this.input = new Node(
      this.x,
      this.y + this.height / 2,
      "00000000000000000000000101011000"
    );
    this.output = new Node(
      this.x + this.width,
      this.y + this.height / 2,
      false
    );
    nodes.push(this.input, this.output);
  }

  update() {
    this.output.changeValue(organizer.setCurrAddress(this.input.value));
  }

  show() {
    rect(this.x, this.y, this.width, this.height);
  }
}

class Alu extends Component {
  constructor(x, y, isAdd, defaultValue = false) {
    super(x, y, 100, 150, isAdd ? "Add" : "Alu", 2.5, 2);
    this.isAdd = isAdd;
    this.wires = [];
    this.inputs = [];
    this.outputs = [];
    this.additionalInput;
    this.defaultValue = defaultValue;
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
    this.inputs.push(new Node(this.x, this.y + 120, this.defaultValue));
    nodes = nodes.concat(this.outputs).concat(this.inputs);
  }

  update() {
    let aluOp = this.isAdd ? "010" : this.additionalInput.value.toString();
    let inp1Val = this.inputs[0].value;
    let inp1 = binToDec(inp1Val);
    let inp2Val = this.inputs[1].value;
    // let isAddress = inp2Val[1] == "x";
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

    result = dectoBin(result, 5);
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

    nodes.push(this.input, this.output);
  }

  update() {
    let code = organizer.getPcValues(this.input.value).replaceAll(" ", "");
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
    let regValues = organizer.getRegValues();
    let decValue1 = regValues[binToDec(this.inputs[0].value) - 1];
    this.outputs[0].changeValue(dectoBin(decValue1, 5));
    //  && this.inputs[2].value
    let decValue2 = regValues[binToDec(this.inputs[1].value) - 1];
    this.outputs[1].changeValue(dectoBin(decValue2, 5));
    // this.outputs[1].changeValue("X");
    if (this.additionalInput.value) {
      regValues[binToDec(this.inputs[2])] = this.inputs[3];
      updateRegisters();
    }
  }

  show() {
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

  update() {}
  show() {
    rect(this.x, this.y, this.width, this.height);
  }
}

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
    } else {
      this.output.changeValue(
        this.toTop ? this.inputs[1].value : this.inputs[0].value
      );
    }

    this.updateAddress && organizer.setCurrAddress(this.output.value);
  }

  show() {
    rect(this.x, this.y, this.width, this.height, 55);
  }
}

class Ellipse extends Component {
  constructor(x, y, text, r, hasAdditional = false) {
    super(x, y, r, r, text, 7, 2.5);
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
      value = "00" + value;
      this.output.changeValue(value.slice(2) + value.slice(0, 2));
    } else if (this.text == "Sign\nExtend") {
      this.output.changeValue(
        (value = value[0].repeat(32 - value.length) + value)
      );
    } else if (this.text == "Alu\nControl") {
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

      // 0 0 1 0
      // 3 2 1 0

      this.output.changeValue(op3 + +op2 + +op1 + +op0);
    } else {
      // truncate
      this.output.changeValue(
        this.additionalInput.value + "" + this.input.value
      );
    }
  }

  show() {
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
    let opCode = this.input.value;
    // Normally, I made this component with combinational logic.
    // But then I relize that I need to show that if this signal is true, false or X(don't care)
    // Since there is no way to determinate weather if this signal X or not with combinational logic,
    // I reimplement this with brute force way. Sorry for this mess.

    // this.outputs[5].value = opCode == "100011" || opCode == "101011"? "00":
    // opCode == "000100"? "01" :
    // ;

    this.outputs[0].changeValue(opCode == "000000"); // regdest
    this.outputs[1].changeValue(opCode == "000010" || opCode == "000011"); //jump
    this.outputs[2].changeValue(opCode == "000100"); //branch
    this.outputs[3].changeValue(opCode == "100011"); //memread
    this.outputs[4].changeValue(opCode == "100011"); // memtoreg
    this.outputs[5].changeValue(
      ["000000"].includes(opCode)
        ? "10"
        : ["100011", "101011"].includes(opCode)
        ? "00"
        : opCode == "000100"
        ? "01"
        : "11" //X
    ); //aluop
    this.outputs[6].changeValue(opCode == "101011"); //memwrite
    this.outputs[7].changeValue(opCode != "000000" && opCode != "000100"); //alusrc
    this.outputs[8].changeValue(
      !["101011", "000010", "000100"].includes(opCode)
    ); //regwrite

    // if (isJr) {
    //   this.outputs[0].changeValue("X");
    //   this.outputs[1].changeValue(false);
    //   this.outputs[2].changeValue(false);
    //   this.outputs[3].changeValue("X");
    //   this.outputs[4].changeValue("X");
    //   this.outputs[5].changeValue("X");
    //   this.outputs[6].changeValue(false);
    //   this.outputs[7].changeValue("X");
    //   this.outputs[8].changeValue(false);
    //   return;
    // }
    // //sw        beq       j
    // if (["101011", "000100", "000010"].includes(opCode)) {
    //   this.outputs[0].changeValue("X");
    //   this.outputs[1].changeValue(opCode == "000010");
    //   this.outputs[2].changeValue(
    //     opCode == "000010" ? "X" : opCode == "000100"
    //   );
    //   this.outputs[3].changeValue(opCode == false);
    //   this.outputs[4].changeValue(opCode == "X");
    //   this.outputs[5].changeValue(
    //     opCode == "000010" ? "X" : opCode == "101011" ? "00" : "01"
    //   );
    //   this.outputs[6].changeValue(opCode == "101011");
    //   this.outputs[7].changeValue(
    //     opCode == "000010" ? "X" : opCode == "101011"
    //   );
    //   this.outputs[8].changeValue(false);
    //   return;
    // }
    // this.outputs[0].changeValue(opCode == "000000");
    // this.outputs[1].changeValue(opCode == "000010" || opCode == "000011");
    // this.outputs[2].changeValue(opCode == "000100");
    // this.outputs[3].changeValue(opCode == "100011");
    // this.outputs[4].changeValue(opCode == "100011");
    // this.outputs[5].changeValue(
    //   opCode == "100011" || opCode == "101011"
    //     ? "00"
    //     : opCode == "000100"
    //     ? "01"
    //     : opCode == "000010" || opCode == "000011" || opCode == "001000"
    //     ? "X"
    //     : "10"
    // );
    // this.outputs[6].changeValue(opCode == "101011");
    // this.outputs[7].changeValue(opCode != "000000" && opCode != "000100");
    // this.outputs[8].changeValue(
    //   opCode != "101011" && opCode != "000100" && opCode != "000010"
    // );
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

  update() {
    this.output.changeValue(this.input2.value && this.input1.value);
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
