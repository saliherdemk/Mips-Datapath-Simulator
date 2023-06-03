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
  }

  showNodes() {
    this.input.draw();
    this.output.draw();
  }

  show() {
    rect(this.x, this.y, this.width, this.height);
    this.showNodes();
  }
}

class Alu extends Component {
  constructor(x, y, isAdd) {
    super(x, y, 100, 150, isAdd ? "Add" : "Alu", 2.5, 2);
    this.inputs = [];
    this.outputs = [];
    this.additionalInput;
    this.generateIO(isAdd);
  }

  generateIO(isAdd) {
    if (!isAdd) {
      this.additionalInput = new Node(
        this.x + this.width / 2,
        this.y + this.height / 1.1
      );
      this.outputs.push(
        new Node(this.x + this.width, this.y + this.height / 3, false)
      );
    }
    this.outputs.push(
      new Node(
        this.x + this.width,
        this.y + this.height / (!isAdd ? 1.5 : 2),
        false
      )
    );

    this.inputs.push(new Node(this.x, this.y + 30, false));
    this.inputs.push(new Node(this.x, this.y + 120, false));
  }

  showNodes() {
    [...this.inputs, ...this.outputs, this.additionalInput].forEach((el) => {
      el && el.draw();
    });
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

    this.showNodes();
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
  }

  update() {
    let type = this.input.value[1];
    let codeArr = this.input.value[0];
    console.log(codeArr);
    if (type == "R") {
      this.wires[0].endNode.changeValue("X");

      this.wires[1].endNode.changeValue(codeArr[0]);
      this.wires[2].endNode.changeValue(codeArr[1]);
      this.wires[3].endNode.changeValue(codeArr[2]);
      this.wires[4].endNode.changeValue(codeArr[3]);
      this.wires[5].endNode.changeValue(codeArr[5]);
    }
  }

  show() {
    this.input.value && this.update();
    rect(this.x, this.y, this.width, this.height);
    this.input.draw();
    this.output.draw();
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
  }

  showNodes() {
    [...this.inputs, ...this.outputs, this.additionalInput].forEach((el) => {
      el.draw();
    });
  }

  show() {
    rect(this.x, this.y, this.width, this.height);
    this.showNodes();
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
  }

  showNodes() {
    [...this.inputs, this.output, ...this.additionalInputs].forEach((el) => {
      el.draw();
    });
  }

  show() {
    rect(this.x, this.y, this.width, this.height);
    this.showNodes();
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
  }

  showNodes() {
    [...this.inputs, this.output, this.additionalInput].forEach((el) => {
      el.draw();
    });
  }

  show() {
    rect(this.x, this.y, this.width, this.height, 55);
    this.showNodes();
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
    }
    this.input = new Node(this.x, this.y + this.height / 2, false);
    this.output = new Node(
      this.x + this.width,
      this.y + this.height / 2,
      false
    );
  }

  showNodes() {
    this.additionalInput && this.additionalInput.draw();
    this.input.draw();
    this.output.draw();
  }

  show() {
    rect(this.x, this.y, this.width, this.height, 50);
    this.showNodes();
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
  }

  showNodes() {
    [...this.outputs, this.input].forEach((el) => {
      el.draw();
    });
  }

  update() {
    let opCode = this.input.value;
    this.outputs[0].value = opCode == "000000";
    this.outputs[1].value = opCode == "000010" || opCode == "000011";
    this.outputs[2].value = opCode == "000100";
    this.outputs[3].value = opCode == "100011";
    this.outputs[4].value = opCode == "100011";
    // this.outputs[5].value = (
    // opCode == "100011" || opCode == "101011" ? "00" :
    // opCode == "000100"?  "01" :
    // )
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
    this.showNodes();
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
  }

  updateNode() {
    this.output.changeValue(this.input1 && this.input2);
  }

  showNodes() {
    this.input1.draw();
    this.input2.draw();
    this.output.draw();
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

    this.showNodes();
  }
}
