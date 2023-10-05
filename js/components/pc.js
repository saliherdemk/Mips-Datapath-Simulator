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
      "00000000000000000000000000000000",
      "top"
    );
    this.output = new Node(
      this.x + this.width,
      this.y + this.height / 2,
      false,
      "bottom"
    );
    pathOrganizer.addNodes([this.input, this.output]);
  }

  setNextAddress() {
    addressOrganizer.updateCurrentAddress(this.input.value);
  }

  update() {
    this.output.changeValue(this.input.value);
  }

  show() {
    rect(this.x, this.y, this.width, this.height);
  }
}
