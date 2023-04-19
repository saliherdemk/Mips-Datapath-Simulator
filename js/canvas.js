var components = [];
var wires = [];
var points = [];

function createComponents() {
  let originX = (windowWidth - 1000) / 2;
  let originY = (windowHeight - 750) / 2;

  let pc = new Pc(originX + 50, originY + 300);
  let alu1 = new Alu(originX + 200, originY + 100, true);
  let alu2 = new Alu(originX + 650, originY + 100, true);
  let alu3 = new Alu(originX + 650, originY + 275, false);
  let im = new InstructionMemory(originX + 150, originY + 300);
  let register = new Registers(originX + 400, originY + 300);
  let dm = new DataMemory(originX + 825, originY + 350);
  let mux1 = new Mux(originX + 325, originY + 360);
  let mux2 = new Mux(originX + 580, originY + 350);
  let mux3 = new Mux(originX + 975, originY + 475);
  let mux4 = new Mux(originX + 850, originY + 50);
  let signExtend = new Ellipse(originX + 450, originY + 475, "Sign\nExtend");
  let aluControl = new Ellipse(originX + 580, originY + 540, "Alu\nControl");
  let shift = new Ellipse(originX + 550, originY + 175, "Shift\nLeft 2");

  let i20Node = new Node(originX + 275, originY + 350);
  let mux3toReg4_1 = new Node(originX + 975, originY + 650);
  let mux3toReg4_2 = new Node(originX + 375, originY + 650);
  let seNode = new Node(originX + 400, originY + 525);
  let alu1Node = new Node(originX + 500, originY + 130);
  let mux4toPc_1 = new Node(originX + 10, originY + 25);

  components.push(
    pc,
    alu1,
    alu2,
    alu3,
    im,
    register,
    dm,
    mux1,
    mux2,
    mux3,
    mux4,
    signExtend,
    aluControl,
    shift
  );

  wires.push(
    new Wire(pc.output, im.input),
    new Wire(pc.output, alu1.inputs[0]),
    new Wire(im.output, register.inputs[0]),
    new Wire(im.output, i20Node),
    new Wire(i20Node, register.inputs[1]),
    new Wire(i20Node, mux1.inputs[0]),
    new Wire(im.output, mux1.inputs[1]),
    new Wire(mux1.output, register.inputs[2]),
    new Wire(im.output, signExtend.input),
    new Wire(signExtend.output, shift.input),
    new Wire(signExtend.output, mux2.inputs[1]),
    new Wire(register.outputs[0], alu3.inputs[0]),
    new Wire(register.outputs[1], mux2.inputs[0]),
    new Wire(mux2.output, alu3.inputs[1]),
    new Wire(alu3.outputs[1], dm.inputs[0]),
    new Wire(alu3.outputs[1], mux3.inputs[1]),
    new Wire(dm.output, mux3.inputs[0]),
    new Wire(register.outputs[1], dm.inputs[1]),
    new Wire(mux3.output, mux3toReg4_1),
    new Wire(mux3toReg4_1, mux3toReg4_2),
    new Wire(mux3toReg4_2, register.inputs[3], true),
    new Wire(seNode, aluControl.input),
    new Wire(shift.output, alu2.inputs[1]),
    new Wire(alu1.outputs[0], alu2.inputs[0]),
    new Wire(alu1Node, mux4.inputs[0]),
    new Wire(alu2.outputs[0], mux4.inputs[1]),
    new Wire(mux4.output, mux4toPc_1),
    new Wire(mux4toPc_1, pc.input, true)
  );

  points.push(
    new Point(originX + 125, originY + 375),
    new Point(originX + 300, originY + 350),
    new Point(originX + 540, originY + 403),
    new Point(originX + 525, originY + 400),
    new Point(originX + 775, originY + 400),
    new Point(originX + 425, originY + 525),
    new Point(originX + 525, originY + 130)
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createComponents();
}

function draw() {
  noFill();
  for (let i = 0; i < wires.length; i++) {
    wires[i].draw();
  }
  fill(255);

  for (let i = 0; i < components.length; i++) {
    components[i].draw();
  }

  for (let i = 0; i < points.length; i++) {
    points[i].draw();
  }
}
