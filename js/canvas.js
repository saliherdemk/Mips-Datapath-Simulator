var components = [];
var wires = [];
var points = [];
var instruction = "add $s1 $s2 $s3";

function go() {
  var [op, rs, rt] = instruction.split(" ");
  var opCode = opCodes[op];
  console.log(opCode);
}

function init() {
  let originX = (windowWidth - 1100) / 2;
  let originY = (windowHeight - 650) / 2;
  let skyColor = color(5, 176, 239);

  let pc = new Pc(originX + 50, originY + 350);
  let alu1 = new Alu(originX + 140, originY + 50, true);
  let alu2 = new Alu(originX + 715, originY + 95, true);
  let alu3 = new Alu(originX + 650, originY + 325, false);
  let im = new InstructionMemory(originX + 150, originY + 350);
  let register = new Registers(originX + 400, originY + 350);
  let dm = new DataMemory(originX + 825, originY + 400);
  let mux1 = new Mux(originX + 325, originY + 410);
  let mux2 = new Mux(originX + 580, originY + 400, true);
  let mux3 = new Mux(originX + 975, originY + 300, true);
  let mux4 = new Mux(originX + 1100, originY, true);
  let mux5 = new Mux(originX + 950, originY + 50);
  let signExtend = new Ellipse(originX + 450, originY + 525, "Sign\nExtend");
  let aluControl = new Ellipse(
    originX + 580,
    originY + 565,
    "Alu\nControl",
    true
  );
  let shift = new Ellipse(originX + 600, originY + 195, "Shift\nLeft 2");
  let shift2 = new Ellipse(originX + 400, originY, "Shift\nLeft 2");

  let control = new Control(
    originX + 340,
    originY + 125,
    "C\nO\nN\nT\nR\nO\nL"
  );
  let and = new AndGate(originX + 892.5, originY + 220);

  let i20Node = new Node(originX + 275, originY + 400);
  let mux3toReg4_1 = new Node(originX + 975, originY + 650);
  let mux3toReg4_2 = new Node(originX + 375, originY + 650);
  let seNode = new Node(originX + 400, originY + 558);
  let mux4toPc_1 = new Node(originX + 10, originY - 5);
  let regDest_1 = new Node(originX + 400, originY + 110);
  let regDest_2 = new Node(originX + 265, originY + 110);
  let regDest_3 = new Node(originX + 265, originY + 520);
  let regDest_4 = new Node(originX + 342, originY + 520);
  let jump_1 = new Node(originX + 600, originY + 165);
  let jump_2 = new Node(originX + 600, originY - 20);
  let jump_3 = new Node(originX + 1117, originY - 20);
  let memToRegNode = new Node(originX + 992.5, originY + 210);
  let aluControlNode = new Node(originX + 587.5, originY + 700);
  let alu3Node = new Node(originX + 700, originY + 598);
  let memWriteNode = new Node(originX + 850, originY + 265);
  let aluSrcNode = new Node(originX + 597, originY + 285);
  let regNode = new Node(originX + 450, originY + 305);
  let memReadNode_1 = new Node(originX + 1050, originY + 190);
  let memReadNode_2 = new Node(originX + 1050, originY + 600);
  let memReadNode_3 = new Node(originX + 875, originY + 600);
  let aluZeroNode1 = new Node(originX + 765, originY + 375);
  let aluZeroNode2 = new Node(originX + 800, originY + 275);
  let branchNode = new Node(originX + 825, originY + 175);
  let branchNode1 = new Node(originX + 850, originY + 230);
  let alu1Node = new Node(originX + 650, originY + 125);
  let addToShiftNode = new Node(originX + 500, originY + 125);
  let topShiftNode = new Node(originX + 550, originY + 33);

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
    mux5,
    signExtend,
    aluControl,
    shift,
    control,
    and,
    shift2
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
    new Wire(alu1.outputs[0], addToShiftNode),
    new Wire(addToShiftNode, alu1Node),
    new Wire(addToShiftNode, topShiftNode, true),
    new Wire(topShiftNode, mux4.inputs[0], true),

    new Wire(addToShiftNode, alu1Node),
    new Wire(alu1Node, alu2.inputs[0]),
    new Wire(alu1Node, mux5.inputs[0], true),
    new Wire(alu2.outputs[0], mux5.inputs[1]),
    new Wire(mux4.output, mux4toPc_1),
    new Wire(mux4toPc_1, pc.input, true),
    new Wire(im.output, control.input),
    new Wire(control.outputs[0], regDest_1, false, skyColor, "RegDest", 30, -5),
    new Wire(regDest_1, regDest_2, true, skyColor),
    new Wire(regDest_2, regDest_3, true, skyColor),
    new Wire(regDest_3, regDest_4, false, skyColor),
    new Wire(regDest_4, mux1.additionalInput, true, skyColor),
    new Wire(control.outputs[1], jump_1, false, skyColor, "Jump", 35, -5),
    new Wire(jump_1, jump_2, true, skyColor),
    new Wire(jump_2, jump_3, false, skyColor),

    new Wire(jump_3, mux4.additionalInput, true, skyColor),
    new Wire(
      control.outputs[3],
      memReadNode_1,
      false,
      skyColor,
      "MemRead",
      35,
      0
    ),
    new Wire(
      control.outputs[4],
      memToRegNode,
      false,
      skyColor,
      "MemToReg",
      35,
      0
    ),
    new Wire(memToRegNode, mux3.additionalInput, true, skyColor),
    new Wire(
      control.outputs[5],
      aluControlNode,
      false,
      skyColor,
      "ALUOp",
      10,
      -3
    ),
    new Wire(aluControlNode, aluControl.additionalInput, false, skyColor),
    new Wire(aluControl.output, alu3Node),
    new Wire(alu3Node, alu3.additionalInput, true),
    new Wire(
      control.outputs[6],
      memWriteNode,
      false,
      skyColor,
      "MemWrite",
      40,
      -5
    ),
    new Wire(memWriteNode, dm.additionalInputs[0], false, skyColor),
    new Wire(control.outputs[7], aluSrcNode, false, skyColor, "ALUSrc", 50, -4),
    new Wire(aluSrcNode, mux2.additionalInput, true, skyColor),
    new Wire(control.outputs[8], regNode, true, skyColor, "RegWrite", 65, 20),
    new Wire(regNode, register.additionalInput, true, skyColor),
    new Wire(memReadNode_1, memReadNode_2, true, skyColor),
    new Wire(memReadNode_2, memReadNode_3, true, skyColor),
    new Wire(memReadNode_3, dm.additionalInputs[1], true, skyColor),
    new Wire(control.outputs[2], branchNode, false, skyColor, "Branch", 35, 2),
    new Wire(alu3.outputs[0], aluZeroNode1, true),
    new Wire(aluZeroNode1, aluZeroNode2, true),
    new Wire(aluZeroNode2, and.input2, true),
    new Wire(branchNode, branchNode1, false, skyColor),
    new Wire(branchNode1, and.input1, false, skyColor),
    new Wire(and.output, mux5.additionalInput),
    new Wire(mux5.output, mux4.inputs[1], false),
    new Wire(im.output, shift2.input),
    new Wire(shift2.output, topShiftNode)
  );

  points.push(
    new Point(originX + 125, originY + 425),
    new Point(originX + 300, originY + 400),
    new Point(originX + 540, originY + 453),
    new Point(originX + 525, originY + 450),
    new Point(originX + 775, originY + 425),
    new Point(originX + 425, originY + 558),
    new Point(originX + 650, originY + 125),
    new Point(originX + 500, originY + 125),
    new Point(originX + 500, originY + 35)
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
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
