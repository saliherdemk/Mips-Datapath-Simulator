class Pc {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 150;
    this.text = "PC";
  }

  show() {
    rect(this.x, this.y, this.width, this.height);
  }

  drawText() {
    text(this.text, this.x + this.width / 3, this.y + this.height / 2);
  }

  draw() {
    this.show();
    this.drawText();
  }
}

class Alu {
  constructor(x, y, isAdd) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 150;
    this.inputs = [];
    this.outputs = [];
    this.generateIO(isAdd);
    this.text = isAdd ? "Add" : "Alu";
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

  drawText() {
    text(this.text, this.x + this.width / 2.5, this.y + this.height / 2);
  }

  draw() {
    this.show();
    this.drawText();
  }
}

class InstructionMemory {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 150;
    this.input;
    this.output;
    this.text = "Instruction\nMemory";
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

  drawText() {
    text(this.text, this.x + this.width / 4, this.y + this.height / 1.2);
  }

  draw() {
    this.show();
    this.drawText();
  }
}

class Registers {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 150;
    this.inputs = [];
    this.outputs = [];
    this.text = "Registers";
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

  drawText() {
    text(this.text, this.x + this.width / 4, this.y + this.height / 1.1);
  }

  draw() {
    this.show();
    this.drawText();
  }
}

class DataMemory {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 150;
    this.inputs = [];
    this.output;
    this.text = "Data Memory";
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

  drawText() {
    text(this.text, this.x + this.width / 6, this.y + this.height / 1.1);
  }

  draw() {
    this.show();
    this.drawText();
  }
}
