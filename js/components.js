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
  }

  generateIO() {
    this.input = new Node(this.x, this.y + this.height / 2, false);
    this.output = new Node(
      this.x + this.width,
      this.y + this.height / 2,
      false
    );
  }

  show() {
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
    for (let i = 1; i < 9; i++) {
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
    this.showNodes();
  }
}
