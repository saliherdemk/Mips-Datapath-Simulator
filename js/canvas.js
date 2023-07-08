var components = [];
var wires = [];
var points = [];
var nodes = [];
var cnv;
var pc;
var register;

function init() {
  setSelectOptions();
  setRegInputs();
  let originX = 0;
  let originY = 25;
  let skyColor = color(5, 176, 239);

  pc = new Pc(originX + 50, originY + 350);
  let alu1 = new Alu(originX + 140, originY + 50, true, "00100");
  let alu2 = new Alu(originX + 715, originY + 90, true);
  let alu3 = new Alu(originX + 650, originY + 325, false);
  let im = new InstructionMemory(originX + 150, originY + 350);
  register = new Registers(originX + 400, originY + 350);
  let dm = new DataMemory(originX + 825, originY + 400);
  let mux1 = new Mux(originX + 325, originY + 410);
  let mux2 = new Mux(originX + 580, originY + 400, false);
  let mux3 = new Mux(originX + 975, originY + 300, true);
  let mux4 = new Mux(originX + 1040, originY + 6.5, true, true);
  let mux5 = new Mux(originX + 880, originY + 6.5);
  let mux6 = new Mux(originX + 960, originY + 80);

  let signExtend = new Ellipse(
    originX + 450,
    originY + 525,
    "Sign\nExtend",
    66
  );
  let aluControl = new Ellipse(
    originX + 580,
    originY + 565,
    "Alu\nControl",
    66,
    true
  );
  let shift = new Ellipse(originX + 600, originY + 195, "Shift\nLeft 2", 66);
  let topShift = new Ellipse(originX + 400, originY, "Shift\nLeft 2", 66);
  let truncate = new Ellipse(originX + 540, originY + 18, "", 30, true);

  let control = new Control(
    originX + 340,
    originY + 125,
    "C\nO\nN\nT\nR\nO\nL"
  );
  let and = new AndGate(originX + 800, originY + 290);

  let i20Node = new Node(originX + 275, originY + 400);
  let mux3toReg4_1 = new Node(originX + 975, originY + 650);
  let mux3toReg4_2 = new Node(originX + 375, originY + 650);
  let seNode = new Node(originX + 400, originY + 558);
  let aluNode = new Node(originX + 400, originY + 558);
  let mux4toPc_1 = new Node(originX + 10, originY - 5);
  let regDest_1 = new Node(originX + 400, originY + 110);
  let regDest_2 = new Node(originX + 265, originY + 110);
  let regDest_3 = new Node(originX + 265, originY + 520);
  let regDest_4 = new Node(originX + 342, originY + 520);
  let jump_1 = new Node(originX + 620, originY + 161.5);
  let jump_2 = new Node(originX + 620, originY - 20);
  let jump_3 = new Node(mux4.additionalInput.x, originY - 20);
  let memToRegNode = new Node(originX + 992.5, originY + 234);
  let aluControlNode = new Node(originX + 588, originY + 700);
  let aluCOutputNode = new Node(originX + 700, originY + 598);
  let alu3SecondNode = new Node(originX + 775, originY + 425);

  let memWriteNode = new Node(originX + 850, originY + 270.5);
  let aluSrcNode = new Node(originX + 560, originY + 288.5);
  let aluSrcNode1 = new Node(originX + 598, originY + 495);
  let regNode = new Node(originX + 450, originY + 307);
  let memReadNode_1 = new Node(originX + 1050, originY + 216);
  let memReadNode_2 = new Node(originX + 1050, originY + 600);
  let memReadNode_3 = new Node(originX + 875, originY + 600);
  let aluZeroNode1 = new Node(originX + 765, originY + 375);
  let branchNode = new Node(originX + 655, originY + 197.5);
  let alu0Node = new Node(originX + 300, originY + 125);

  let alu1Node = new Node(originX + 650, originY + 75);

  let addToShiftNode = new Node(originX + 554.5, originY + 75);
  let regOutput1Node = new Node(originX + 500, originY + 450);
  let andOutputNode = new Node(mux5.additionalInput.x, originY + 315);
  let reg0Node1 = new Node(originX + 600, originY + 355);
  let reg0Node2 = new Node(originX + 900, originY + 280);

  let jrNode = new Node(mux6.additionalInput.x, control.outputs[2].y);

  components.push(
    pc,
    alu1,
    im,
    topShift,
    control,
    mux1,
    signExtend,
    register,
    mux2,
    aluControl,
    alu3,
    shift,
    alu2,
    truncate,
    dm,
    and,
    mux3,
    mux5,
    mux4,
    mux6
  );

  let wire0 = new Wire({ startNode: pc.output, endNode: im.input });
  let wire1 = new Wire({ startNode: pc.output, endNode: alu1.inputs[0] });

  pc.setWires([wire0, wire1]);

  let wire2 = new Wire({
    isManuel: true,
    startNode: im.output,
    endNode: topShift.input,
  });
  let wire3 = new Wire({
    isManuel: true,
    startNode: im.output,
    endNode: control.input,
  });
  let wire4 = new Wire({
    isManuel: true,
    startNode: im.output,
    endNode: register.inputs[0],
  });
  let wire5 = new Wire({
    isManuel: true,
    startNode: im.output,
    endNode: i20Node,
  });
  let wire6 = new Wire({
    isManuel: true,
    startNode: im.output,
    endNode: mux1.inputs[1],
  });
  let wire7 = new Wire({
    isManuel: true,
    startNode: im.output,
    endNode: seNode,
  });
  let wire8 = new Wire({
    isManuel: true,
    startNode: im.output,
    endNode: aluNode,
  });
  let wire5_1 = new Wire({
    startNode: i20Node,
    endNode: register.inputs[1],
  });
  let wire5_2 = new Wire({
    startNode: i20Node,
    endNode: mux1.inputs[0],
  });
  let wire7_1 = new Wire({
    startNode: seNode,
    endNode: signExtend.input,
  });
  let wire8_1 = new Wire({
    startNode: aluNode,
    endNode: aluControl.input,
  });

  im.setWires([
    wire2,
    wire3,
    wire4,
    wire5,
    wire6,
    wire7,
    wire8,
    wire5_1,
    wire5_2,
    wire7_1,
    wire8_1,
  ]);

  let wire11 = new Wire({
    isManuel: true,
    startNode: alu1.outputs[0],
    endNode: alu0Node,
  });
  let wire11_1 = new Wire({
    startNode: alu0Node,
    endNode: alu1Node,
  });

  let wire11_1_1 = new Wire({
    startNode: alu1Node,
    endNode: alu2.inputs[0],
    backwards: true,
  });
  let wire11_2 = new Wire({
    startNode: alu1Node,
    endNode: mux5.inputs[0],
    backwards: true,
  });
  let wire12 = new Wire({
    isManuel: true,
    startNode: alu0Node,
    endNode: addToShiftNode,
  });
  let wire12_1 = new Wire({
    startNode: addToShiftNode,
    endNode: truncate.additionalInput,
    backwards: true,
  });

  alu1.setWires([wire11, wire12, wire11_1, wire11_1_1, wire11_2, wire12_1]);

  let wire13 = new Wire({
    startNode: mux1.output,
    endNode: register.inputs[2],
  });
  mux1.setWires([wire13]);

  let wire14 = new Wire({ startNode: signExtend.output, endNode: shift.input });
  let wire15 = new Wire({
    startNode: signExtend.output,
    endNode: mux2.inputs[1],
  });
  signExtend.setWires([wire14, wire15]);

  let wire16 = new Wire({
    startNode: register.outputs[0],
    endNode: reg0Node1,
  });

  let wire16_1 = new Wire({
    startNode: reg0Node1,
    endNode: alu3.inputs[0],
  });

  let wire16_2 = new Wire({
    startNode: reg0Node1,
    endNode: reg0Node2,
    backwards: true,
  });

  let wire16_2_1 = new Wire({
    startNode: reg0Node2,
    endNode: mux6.inputs[1],
  });

  let wire17 = new Wire({
    startNode: register.outputs[1],
    endNode: regOutput1Node,
  });
  let wire17_1 = new Wire({
    startNode: regOutput1Node,
    endNode: mux2.inputs[0],
  });
  let wire17_2 = new Wire({ startNode: regOutput1Node, endNode: dm.inputs[1] });

  register.setWires([
    wire16,
    wire17,
    wire16_1,
    wire16_2,
    wire16_2_1,
    wire17_1,
    wire17_2,
  ]);

  let wire18 = new Wire({ startNode: mux2.output, endNode: alu3.inputs[1] });
  mux2.setWires([wire18]);

  let wire19 = new Wire({
    startNode: alu3.outputs[1],
    endNode: alu3SecondNode,
  });
  let wire19_1 = new Wire({
    startNode: alu3SecondNode,
    endNode: dm.inputs[0],
    backwards: true,
  });
  let wire19_2 = new Wire({
    startNode: alu3SecondNode,
    endNode: mux3.inputs[1],
    backwards: true,
  });
  alu3.setWires([wire19, wire19_1, wire19_2]);

  let wire20 = new Wire({ startNode: dm.output, endNode: mux3.inputs[0] });
  dm.setWires([wire20]);

  let wire21 = new Wire({ startNode: mux3.output, endNode: mux3toReg4_1 });
  let wire21_1 = new Wire({ startNode: mux3toReg4_1, endNode: mux3toReg4_2 });
  let wire21_1_1 = new Wire({
    startNode: mux3toReg4_2,
    endNode: register.inputs[3],
    backwards: true,
  });
  mux3.setWires([wire21, wire21_1, wire21_1_1]);

  let wire22 = new Wire({ startNode: shift.output, endNode: alu2.inputs[1] });
  shift.setWires([wire22]);

  let wire23 = new Wire({
    startNode: truncate.output,
    endNode: mux6.inputs[0],
  });
  truncate.setWires([wire23]);

  let wire24 = new Wire({
    startNode: topShift.output,
    endNode: truncate.input,
    backwards: true,
  });
  topShift.setWires([wire24]);

  let wire25 = new Wire({
    startNode: alu2.outputs[0],
    endNode: mux5.inputs[1],
  });
  alu2.setWires([wire25]);

  let wire26 = new Wire({ startNode: mux4.output, endNode: mux4toPc_1 });
  let wire26_1 = new Wire({
    startNode: mux4toPc_1,
    endNode: pc.input,
    backwards: true,
  });

  mux4.setWires([wire26, wire26_1]);

  let wire27 = new Wire({
    startNode: control.outputs[0],
    endNode: regDest_1,
    wireColor: skyColor,
    text: "RegDest",
    textXOffset: 30,
    textYOffset: -5,
  });
  let wire27_1 = new Wire({
    startNode: regDest_1,
    endNode: regDest_2,
    backwards: true,
    wireColor: skyColor,
  });
  let wire27_1_1 = new Wire({
    startNode: regDest_2,
    endNode: regDest_3,
    backwards: true,
    wireColor: skyColor,
  });
  let wire27_1_1_1 = new Wire({
    startNode: regDest_3,
    endNode: regDest_4,
    wireColor: skyColor,
  });
  let wire27_1_1_1_1 = new Wire({
    startNode: regDest_4,
    endNode: mux1.additionalInput,
    backwards: true,
    wireColor: skyColor,
  });

  let wire28 = new Wire({
    startNode: control.outputs[1],
    endNode: jump_1,
    wireColor: skyColor,
    text: "Jump",
    textXOffset: 35,
    textYOffset: 2,
  });
  let wire28_1 = new Wire({
    startNode: jump_1,
    endNode: jump_2,
    backwards: true,
    wireColor: skyColor,
  });
  let wire28_1_1 = new Wire({
    startNode: jump_2,
    endNode: jump_3,
    wireColor: skyColor,
  });
  let wire28_1_1_1 = new Wire({
    startNode: jump_3,
    endNode: mux4.additionalInput,
    backwards: true,
    wireColor: skyColor,
  });
  let wire29 = new Wire({
    startNode: control.outputs[4],
    endNode: memReadNode_1,
    wireColor: skyColor,
    text: "MemRead",
    textXOffset: 35,
    textYOffset: 2,
  });
  let wire29_1 = new Wire({
    startNode: memReadNode_1,
    endNode: memReadNode_2,
    backwards: true,
    wireColor: skyColor,
  });
  let wire29_1_1 = new Wire({
    startNode: memReadNode_2,
    endNode: memReadNode_3,
    backwards: true,
    wireColor: skyColor,
  });
  let wire29_1_1_1 = new Wire({
    startNode: memReadNode_3,
    endNode: dm.additionalInputs[1],
    backwards: true,
    wireColor: skyColor,
  });
  let wire30 = new Wire({
    startNode: control.outputs[5],
    endNode: memToRegNode,
    wireColor: skyColor,
    text: "MemToReg",
    textXOffset: 35,
    textYOffset: 2,
  });

  let wire30_1 = new Wire({
    startNode: memToRegNode,
    endNode: mux3.additionalInput,
    backwards: true,
    wireColor: skyColor,
  });
  let wire31 = new Wire({
    startNode: control.outputs[6],
    endNode: aluControlNode,
    wireColor: skyColor,
    text: "ALUOp",
    textXOffset: 15,
  });
  let wire31_1 = new Wire({
    startNode: aluControlNode,
    endNode: aluControl.additionalInput,
    wireColor: skyColor,
  });
  let wire32 = new Wire({
    startNode: control.outputs[7],
    endNode: memWriteNode,
    wireColor: skyColor,
    text: "MemWrite",
    textXOffset: 40,
    textYOffset: 2,
  });
  let wire32_1 = new Wire({
    startNode: memWriteNode,
    endNode: dm.additionalInputs[0],
    wireColor: skyColor,
  });

  let wire33 = new Wire({
    startNode: control.outputs[8],
    endNode: aluSrcNode,
    wireColor: skyColor,
    text: "ALUSrc",
    textXOffset: 50,
    textYOffset: 2,
  });
  let wire33_1 = new Wire({
    startNode: aluSrcNode,
    endNode: aluSrcNode1,
    backwards: true,
    wireColor: skyColor,
  });

  let wire33_1_1 = new Wire({
    startNode: aluSrcNode1,
    endNode: mux2.additionalInput,
    backwards: true,
    wireColor: skyColor,
  });
  let wire34 = new Wire({
    startNode: control.outputs[9],
    endNode: regNode,
    backwards: true,
    wireColor: skyColor,
    text: "RegWrite",
    textXOffset: 65,
    textYOffset: 20,
  });
  let wire34_1 = new Wire({
    startNode: regNode,
    endNode: register.additionalInput,
    backwards: true,
    wireColor: skyColor,
  });

  let wire35 = new Wire({
    startNode: alu3.outputs[0],
    endNode: aluZeroNode1,
    backwards: true,
  });
  let wire35_1 = new Wire({
    startNode: aluZeroNode1,
    endNode: and.input2,
    backwards: true,
  });

  let wire36 = new Wire({
    startNode: control.outputs[3],
    endNode: branchNode,
    wireColor: skyColor,
    text: "Branch",
    textXOffset: 35,
    textYOffset: 2,
  });
  let wire36_1 = new Wire({
    startNode: branchNode,
    endNode: and.input1,
    wireColor: skyColor,
  });

  let wireJr = new Wire({
    startNode: control.outputs[2],
    endNode: jrNode,
    wireColor: skyColor,
    text: "JumpReg",
    textXOffset: 35,
    textYOffset: 2,
  });
  let wireJr_1 = new Wire({
    startNode: jrNode,
    endNode: mux6.additionalInput,
    wireColor: skyColor,
    backwards: true,
  });

  control.setWires([
    wire27,
    wireJr,
    wire28,
    wire29,
    wire30,
    wire31,
    wire32,
    wire33,
    wire34,
    wire35,
    wire36,
    wire27_1,
    wire27_1_1,
    wire27_1_1_1,
    wire27_1_1_1_1,
    wireJr_1,
    wire28_1,
    wire28_1_1,
    wire28_1_1_1,
    wire29_1,
    wire29_1_1,
    wire29_1_1_1,
    wire30_1,
    wire31_1,
    wire32_1,
    wire33_1,
    wire33_1_1,
    wire34_1,
    wire35_1,
    wire36_1,
  ]);

  let wire37 = new Wire({
    startNode: aluControl.output,
    endNode: aluCOutputNode,
  });
  let wire37_1 = new Wire({
    startNode: aluCOutputNode,
    endNode: alu3.additionalInput,
    backwards: true,
  });
  aluControl.setWires([wire37, wire37_1]);

  let wire38 = new Wire({
    startNode: and.output,
    endNode: andOutputNode,
  });

  let wire38_1 = new Wire({
    startNode: andOutputNode,
    endNode: mux5.additionalInput,
    backwards: true,
  });

  and.setWires([wire38, wire38_1]);
  let wire39 = new Wire({ startNode: mux5.output, endNode: mux4.inputs[1] });
  mux5.setWires([wire39]);

  let wire40 = new Wire({
    startNode: mux6.output,
    endNode: mux4.inputs[0],
  });

  mux6.setWires([wire40]);

  wires = [];
  components.forEach((component) => {
    wires = [...wires, ...component.wires];
  });

  points.push(
    new Point(originX + 125, originY + 425),
    new Point(originX + 300, originY + 400),
    new Point(originX + 540, originY + 453),
    new Point(originX + 525, originY + 450),
    new Point(originX + 775, originY + 425),
    new Point(originX + 425, originY + 558),
    new Point(originX + 650, originY + 76),
    new Point(originX + 554.5, originY + 75),
    new Point(originX + 600, originY + 355)
  );
}

function setup() {
  cnv = createCanvas(1200, 750);
  cnv.parent(select("#canvas-container"));
  init();
}

function draw() {
  background(255);

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

  for (let i = 0; i < nodes.length; i++) {
    nodes[i].draw();
  }
}

function mousePressed() {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].onClick();
  }
}
