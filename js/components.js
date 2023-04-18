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
    this.generateIO(isAdd);
  }

  generateIO(isAdd) {
    !isAdd &&
      this.outputs.push(
        new Node(this.x + this.width, this.y + this.height / 3, false)
      );
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
    [...this.inputs, ...this.outputs].forEach((el) => {
      el.draw();
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
  }

  showNodes() {
    [...this.inputs, ...this.outputs].forEach((el) => {
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
  }

  showNodes() {
    [...this.inputs, this.output].forEach((el) => {
      el.draw();
    });
  }

  show() {
    rect(this.x, this.y, this.width, this.height);
    this.showNodes();
  }
}

class Mux extends Component {
  constructor(x, y) {
    super(x, y, 35, 80, "M\nU\nX", 3, 3);
    this.inputs = [];
    this.output;
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
  }

  showNodes() {
    [...this.inputs, this.output].forEach((el) => {
      el.draw();
    });
  }

  show() {
    rect(this.x, this.y, this.width, this.height, 55);
    this.showNodes();
  }
}
