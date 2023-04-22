var components = [];
var wires = [];
var points = [];

function createComponents() {
  let originX = (windowWidth - 1000) / 2;
  let originY = (windowHeight - 750) / 2;
  let skyColor = color(5, 176, 239);

  let pc = new Pc(originX + 50, originY + 350);
  let alu1 = new Alu(originX + 150, originY + 5, true);
  let alu2 = new Alu(originX + 750, originY + 50, true);
  let alu3 = new Alu(originX + 650, originY + 325, false);
  let im = new InstructionMemory(originX + 150, originY + 350);
  let register = new Registers(originX + 400, originY + 350);
  let dm = new DataMemory(originX + 825, originY + 400);
  let mux1 = new Mux(originX + 325, originY + 410);
  let mux2 = new Mux(originX + 580, originY + 400, true);
  let mux3 = new Mux(originX + 975, originY + 300, true);
  let mux4 = new Mux(originX + 900, originY);
  let signExtend = new Ellipse(originX + 450, originY + 525, "Sign\nExtend");
  let aluControl = new Ellipse(
    originX + 580,
    originY + 565,
    "Alu\nControl",
    true
  );
  let shift = new Ellipse(originX + 600, originY + 195, "Shift\nLeft 2");
  let control = new Control(
    originX + 340,
    originY + 125,
    "C\nO\nN\nT\nR\nO\nL"
  );

  let i20Node = new Node(originX + 275, originY + 400);
  let mux3toReg4_1 = new Node(originX + 975, originY + 650);
  let mux3toReg4_2 = new Node(originX + 375, originY + 650);
  let seNode = new Node(originX + 400, originY + 558);
  let alu1Node = new Node(originX + 500, originY + 80);
  let mux4toPc_1 = new Node(originX + 10, originY - 5);
  let regDest_1 = new Node(originX + 400, originY + 110);
  let regDest_2 = new Node(originX + 265, originY + 110);
  let regDest_3 = new Node(originX + 265, originY + 520);
  let regDest_4 = new Node(originX + 342, originY + 520);
  let jump_1 = new Node(originX + 917, originY + 165);
  let memToRegNode = new Node(originX + 992.5, originY + 210);
  let aluControlNode = new Node(originX + 587.5, originY + 700);
  let alu3Node = new Node(originX + 700, originY + 598);
  let memWriteNode = new Node(originX + 850, originY + 245);
  let aluSrcNode = new Node(originX + 597, originY + 265);
  let regNode = new Node(originX + 450, originY + 285);
  let memReadNode_1 = new Node(originX + 1050, originY + 190);
  let memReadNode_2 = new Node(originX + 1050, originY + 600);
  let memReadNode_3 = new Node(originX + 875, originY + 600);

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
    shift,
    control
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
    new Wire(mux4toPc_1, pc.input, true),
    new Wire(im.output, control.input),
    new Wire(control.outputs[0], regDest_1, false, skyColor),
    new Wire(regDest_1, regDest_2, true, skyColor),
    new Wire(regDest_2, regDest_3, true, skyColor),
    new Wire(regDest_3, regDest_4, false, skyColor),
    new Wire(regDest_4, mux1.additionalInput, true, skyColor),
    new Wire(control.outputs[1], jump_1, false, skyColor),
    new Wire(jump_1, mux4.additionalInput, true, skyColor),
    new Wire(control.outputs[3], memToRegNode, false, skyColor),
    new Wire(memToRegNode, mux3.additionalInput, true, skyColor),
    new Wire(control.outputs[4], aluControlNode, false, skyColor),
    new Wire(aluControlNode, aluControl.additionalInput, false, skyColor),
    new Wire(aluControl.output, alu3Node),
    new Wire(alu3Node, alu3.additionalInput, true),
    new Wire(control.outputs[5], memWriteNode, false, skyColor),
    new Wire(memWriteNode, dm.additionalInputs[0], false, skyColor),
    new Wire(control.outputs[6], aluSrcNode, false, skyColor),
    new Wire(aluSrcNode, mux2.additionalInput, true, skyColor),
    new Wire(control.outputs[7], regNode, true, skyColor),
    new Wire(regNode, register.additionalInput, true, skyColor),
    new Wire(control.outputs[2], memReadNode_1, false, skyColor),
    new Wire(memReadNode_1, memReadNode_2, true, skyColor),
    new Wire(memReadNode_2, memReadNode_3, true, skyColor),
    new Wire(memReadNode_3, dm.additionalInputs[1], true, skyColor)
  );

  points.push(
    new Point(originX + 125, originY + 425),
    new Point(originX + 300, originY + 400),
    new Point(originX + 540, originY + 453),
    new Point(originX + 525, originY + 450),
    new Point(originX + 775, originY + 425),
    new Point(originX + 425, originY + 558),
    new Point(originX + 525, originY + 80)
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
