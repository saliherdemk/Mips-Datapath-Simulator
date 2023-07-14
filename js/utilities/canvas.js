var components = [];
var wires = [];
var points = [];
var nodes = [];
var cnv;
var pc;
var register;
var currId = 0;

function init() {
  setSelectOptions();
  setRegInputs();
  let originX = 100;
  let originY = 25;
  let skyColor = color(5, 176, 239);

  pc = new Pc(originX + 40, originY + 350);
  let alu1 = new Alu(originX + 130, originY + 50, true, "00100");
  let alu2 = new Alu(originX + 700, originY + 90, true);
  let alu3 = new Alu(originX + 650, originY + 325, false);
  let im = new InstructionMemory(originX + 140, originY + 350);
  register = new Registers(originX + 380, originY + 350);
  let dm = new DataMemory(originX + 825, originY + 410);
  let mux1 = new Mux(originX + 310, originY + 410);
  let mux2 = new Mux(originX + 580, originY + 400, false);
  let mux3 = new Mux(originX + 985, originY + 300, true);
  let mux4 = new Mux(originX + 1000, originY + 6.5, true);
  let mux5 = new Mux(originX + 855, originY + 50);
  let muxJR = new Mux(originX + 1080, originY + 95, false, true);

  let signExtend = new Ellipse(
    originX + 450,
    originY + 525,
    "Sign\nExtend",
    66
  );
  let aluControl = new Ellipse(
    originX + 580,
    originY + 580,
    "Alu\nControl",
    66,
    true
  );
  let shift = new Ellipse(originX + 580, originY + 195, "Shift\nLeft 2", 66);
  let topShift = new Ellipse(originX + 350, originY, "Shift\nLeft 2", 66);
  let truncate = new Ellipse(originX + 540, originY + 18, "", 30, true);

  let control = new Control(
    originX + 340,
    originY + 125,
    "C\nO\nN\nT\nR\nO\nL"
  );
  let and = new AndGate(originX + 790, originY + 290);

  let i20Node = new Node(im.output.x + 25, register.inputs[1].y);

  let mux3toReg4_2 = new Node(register.inputs[3].x - 25, mux3.output.y + 350);

  let seNode = new Node(signExtend.input.x - 50, signExtend.input.y);
  let aluNode = new Node(signExtend.input.x - 50, signExtend.input.y);

  let muxJRtoPc_1 = new Node(pc.input.x - 25, pc.input.y - 435);

  let regDest_1 = new Node(
    control.outputs[1].x - 135,
    control.outputs[1].y - 50
  );

  let regDest_2 = new Node(mux1.additionalInput.x, mux1.additionalInput.y + 25);

  let jump_1 = new Node(control.outputs[2].x + 220, control.outputs[2].y);

  let jump_2 = new Node(mux4.additionalInput.x, mux4.additionalInput.y - 25);

  let memToRegNode = new Node(
    mux3.additionalInput.x,
    mux3.additionalInput.y - 66
  );
  let aluOpNode = new Node(
    aluControl.additionalInput.x,
    aluControl.additionalInput.y + 50
  );

  let aluCOutputNode = new Node(alu3.additionalInput.x, aluControl.output.y);

  let aluCToJrNode = new Node(muxJR.additionalInput.x, aluControl.output.y);

  let alu3SecondNode = new Node(alu3.outputs[1].x + 40, alu3.outputs[1].y);

  let memWriteNode = new Node(dm.additionalInputs[0].x, control.outputs[7].y);

  let aluSrcNode = new Node(mux2.additionalInput.x - 40, control.outputs[8].y);

  let aluSrcNode1 = new Node(
    mux2.additionalInput.x,
    mux2.additionalInput.y + 15
  );

  let regNode = new Node(register.additionalInput.x, control.outputs[9].y);
  let memReadNode_1 = new Node(
    dm.additionalInputs[1].x + 175,
    control.outputs[4].y
  );

  let memReadNode_3 = new Node(
    dm.additionalInputs[1].x,
    dm.additionalInputs[1].y + 25
  );

  let branchNode = new Node(control.outputs[3].x + 265, control.outputs[3].y);
  let alu0Node = new Node(alu1.outputs[0].x + 50, alu1.outputs[0].y);
  let alu1Node = new Node(alu2.inputs[0].x - 65, mux5.inputs[0].y);

  let addToShiftNode = new Node(truncate.additionalInput.x, mux5.inputs[0].y);

  let regOutput1Node = new Node(
    register.outputs[1].x + 20,
    register.outputs[1].y
  );

  let andOutputNode = new Node(mux5.additionalInput.x, and.output.y);
  let reg0Node1 = new Node(alu3.inputs[0].x - 50, alu3.inputs[0].y);

  let reg0Node2 = new Node(and.output.x + 80, and.output.y - 35);

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
    muxJR
  );

  let wire0 = new Wire({ startNode: pc.output, endNode: im.input });
  let wire1 = new Wire({ startNode: pc.output, endNode: alu1.inputs[0] });

  pc.output.setWires([wire0, wire1]);

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

  im.output.setWires([
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

  alu1.outputs[0].setWires([
    wire11,
    wire12,
    wire11_1,
    wire11_1_1,
    wire11_2,
    wire12_1,
  ]);

  let wire13 = new Wire({
    startNode: mux1.output,
    endNode: register.inputs[2],
  });
  mux1.output.setWires([wire13]);

  let wire14 = new Wire({ startNode: signExtend.output, endNode: shift.input });
  let wire15 = new Wire({
    startNode: signExtend.output,
    endNode: mux2.inputs[1],
  });
  signExtend.output.setWires([wire14, wire15]);

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
    endNode: muxJR.inputs[1],
    backwards: true,
  });

  let wire17 = new Wire({
    startNode: register.outputs[1],
    endNode: regOutput1Node,
  });
  let wire17_1 = new Wire({
    startNode: regOutput1Node,
    endNode: mux2.inputs[0],
    backwards: true,
  });
  let wire17_2 = new Wire({
    startNode: regOutput1Node,
    endNode: dm.inputs[1],
    backwards: true,
  });
  register.outputs[0].setWires([wire16, wire16_1, wire16_2, wire16_2_1]);
  register.outputs[1].setWires([wire17, wire17_1, wire17_2]);

  let wire18 = new Wire({ startNode: mux2.output, endNode: alu3.inputs[1] });
  mux2.output.setWires([wire18]);

  let wire35 = new Wire({
    startNode: alu3.outputs[0],
    endNode: and.inputs[1],
  });

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
  alu3.outputs[0].setWires([wire35]);
  alu3.outputs[1].setWires([wire19, wire19_1, wire19_2]);

  let wire20 = new Wire({ startNode: dm.output, endNode: mux3.inputs[0] });
  dm.output.setWires([wire20]);

  let wire21 = new Wire({ startNode: mux3.output, endNode: mux3toReg4_2 });

  let wire21_1_1 = new Wire({
    startNode: mux3toReg4_2,
    endNode: register.inputs[3],
    backwards: true,
  });
  mux3.output.setWires([wire21, wire21_1_1]);

  let wire22 = new Wire({ startNode: shift.output, endNode: alu2.inputs[1] });
  shift.output.setWires([wire22]);

  let wire23 = new Wire({
    startNode: truncate.output,
    endNode: mux4.inputs[0],
  });
  truncate.output.setWires([wire23]);

  let wire24 = new Wire({
    startNode: topShift.output,
    endNode: truncate.input,
    backwards: true,
  });
  topShift.output.setWires([wire24]);

  let wire25 = new Wire({
    startNode: alu2.outputs[0],
    endNode: mux5.inputs[1],
  });
  alu2.outputs[0].setWires([wire25]);

  let wire26 = new Wire({ startNode: mux4.output, endNode: muxJR.inputs[0] });

  mux4.output.setWires([wire26]);

  let wire27 = new Wire({
    startNode: control.outputs[1],
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
    endNode: mux1.additionalInput,
    backwards: true,
    wireColor: skyColor,
  });

  let wire28 = new Wire({
    startNode: control.outputs[2],
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
    endNode: memReadNode_3,
    backwards: true,
    wireColor: skyColor,
  });
  let wire29_1_1 = new Wire({
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
    endNode: aluOpNode,
    wireColor: skyColor,
    text: "ALUOp",
    textXOffset: 15,
  });
  let wire31_1 = new Wire({
    startNode: aluOpNode,
    endNode: aluControl.additionalInput,
    backwards: true,
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
    backwards: true,

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
    endNode: and.inputs[0],
    wireColor: skyColor,
  });

  control.outputs[0].setWires([wire27, wire27_1, wire27_1_1]);
  control.outputs[1].setWires([wire28, wire28_1, wire28_1_1]);
  control.outputs[3].setWires([wire36, wire36_1]);
  control.outputs[4].setWires([wire29, wire29_1, wire29_1_1]);
  control.outputs[5].setWires([wire30, wire30_1]);
  control.outputs[6].setWires([wire31, wire31_1]);
  control.outputs[7].setWires([wire32, wire32_1]);
  control.outputs[8].setWires([wire33, wire33_1, wire33_1_1]);
  control.outputs[9].setWires([wire34, wire34_1]);

  let wireJr = new Wire({
    startNode: aluControl.output,
    endNode: aluCToJrNode,
    wireColor: skyColor,
    isManuel: true,
    isGradient: true,
  });

  let wire37 = new Wire({
    startNode: aluControl.output,
    endNode: aluCOutputNode,
  });

  let wireJr_1 = new Wire({
    startNode: aluCToJrNode,
    endNode: muxJR.additionalInput,
    backwards: true,
    wireColor: skyColor,
    text: "JumpReg",
  });

  let wire37_1 = new Wire({
    startNode: aluCOutputNode,
    endNode: alu3.additionalInput,
    backwards: true,
  });
  aluControl.output.setWires([wireJr, wire37, wire37_1, wireJr_1]);

  let wire38 = new Wire({
    startNode: and.output,
    endNode: andOutputNode,
  });

  let wire38_1 = new Wire({
    startNode: andOutputNode,
    endNode: mux5.additionalInput,
    backwards: true,
  });

  and.output.setWires([wire38, wire38_1]);

  let wire39 = new Wire({ startNode: mux5.output, endNode: mux4.inputs[1] });
  mux5.output.setWires([wire39]);

  let wire40 = new Wire({
    startNode: muxJR.output,
    endNode: muxJRtoPc_1,
  });

  let wire40_1 = new Wire({
    startNode: muxJRtoPc_1,
    endNode: pc.input,
    backwards: true,
  });

  muxJR.output.setWires([wire40, wire40_1]);

  wires = [];
  components.forEach((component) => {
    componentWires = component?.output
      ? component.output.wires
      : component.outputs.reduce(function (a, b) {
          return a.concat(b.wires);
        }, []);
    component.setWires(componentWires);
    wires = [...wires, ...componentWires];
  });

  points.push(
    new Point(originX + 115, originY + 425),
    new Point(originX + 290, originY + 400),
    new Point(originX + 540, originY + 453),
    new Point(originX + 520, originY + 450),
    new Point(originX + 790, originY + 425),
    new Point(originX + 425, originY + 558),
    new Point(originX + 635, originY + 76),
    new Point(originX + 554.5, originY + 76),
    new Point(originX + 600, originY + 355),
    new Point(alu3.additionalInput.x, aluControl.output.y)
  );
}

function setup() {
  cnv = createCanvas(1300, 750);
  cnv.parent(select("#canvas-container"));

  init();
  // initNodesForLejant();
}

function draw() {
  background(255);

  // seeLejant();

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

function initNodesForLejant() {
  nodes.push(new Node(500, 100, false));
  nodes.push(new Node(500, 130, true));
  nodes.push(new Node(500, 160, "true"));
  let a = new Node(500, 250, true);
  a.setDontCare(true);
  let b = new Node(500, 220, false);
  b.setDontCare(true);
  let c = new Node(500, 190, "true");
  c.setDontCare(true);
  nodes.push(a, b, c);
}

function seeLejant() {
  stroke(0);
  strokeWeight(1);
  fill(0, 0, 0);
  textSize(16);
  text("False", 525, 105);

  textSize(17);
  text("True", 525, 135);

  textSize(17);
  text("Hover to see value", 525, 165);

  textSize(17);
  text("Don't Care (Hover to see value)", 525, 195);

  textSize(17);
  text("False but Don't Care", 525, 225);

  textSize(17);
  text("True but Don't Care", 525, 255);

  strokeWeight(2);
}
