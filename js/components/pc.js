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
      "00000000000000000000000101011000",
      "top"
    );
    this.output = new Node(
      this.x + this.width,
      this.y + this.height / 2,
      false,
      "bottom"
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
