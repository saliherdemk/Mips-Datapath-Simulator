function initDatapath() {
  const originX = 120;
  const originY = 25;

  pc = pathOrganizer.setPc(new Pc(originX - 50, originY + 350));
  let alu1 = new Alu(originX + 40, originY + 50, true);
  alu1.inputs[1].changeValue("00100");
  let alu2 = new Alu(originX + 700, originY + 90, true);
  let alu3 = new Alu(originX + 650, originY + 325, false);
  let im = new InstructionMemory(originX + 50, originY + 350);
  register = pathOrganizer.setRegister(
    new Registers(originX + 380, originY + 350)
  );
  let dm = new DataMemory(originX + 825, originY + 410);
  let mux1 = new Mux(originX + 220, originY + 410);
  let muxJal = new Mux(originX + 310, originY + 410);
  muxJal.inputs[1].changeValue("11111");
  let muxJal1 = new Mux(originX + 310, originY + 570, true);

  let mux2 = new Mux(originX + 580, originY + 400, false);
  let mux3 = new Mux(originX + 985, originY + 300, true);
  let mux4 = new Mux(originX + 1000, originY + 6.5, true);
  let mux5 = new Mux(originX + 855, originY + 50, false);
  let muxJR = new Mux(originX + 1080, originY + 95, false);

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
    originX + 320,
    originY + 125,
    "C\nO\nN\nT\nR\nO\nL"
  );
  let and = new AndGate(originX + 790, originY + 290);

  let i20Node = new Node(im.output.x + 25, register.inputs[1].y);

  let mux3toReg4_2 = new Node(muxJal1.inputs[1].x - 35, mux3.output.y + 350);

  let seNode = new Node(signExtend.input.x - 50, signExtend.input.y);
  let aluNode = new Node(signExtend.input.x - 50, signExtend.input.y);

  let muxJRtoPc_1 = new Node(pc.input.x - 25, pc.input.y - 435);

  let regNodes = [
    new Node(control.outputs[1].x + 50, control.outputs[1].y),
    new Node(mux1.additionalInput.x - 50, control.outputs[1].y - 70),
    new Node(mux1.additionalInput.x, mux1.additionalInput.y + 25),
    new Node(register.additionalInput.x, control.outputs[9].y),
    new Node(register.outputs[1].x + 20, register.outputs[1].y),
    new Node(alu3.inputs[0].x - 50, alu3.inputs[0].y),
    new Node(and.output.x + 80, and.output.y - 35),
  ];

  let muxJalNodes = [
    new Node(muxJal.additionalInput.x - 40, control.outputs[0].y - 30),
    new Node(muxJal.additionalInput.x, muxJal.additionalInput.y + 25),
  ];

  let jumpNodes = [
    new Node(control.outputs[2].x + 220, control.outputs[2].y),
    new Node(mux4.additionalInput.x, mux4.additionalInput.y - 25),
  ];

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

  let aluSrcNodes = [
    new Node(mux2.additionalInput.x - 40, control.outputs[8].y),
    new Node(mux2.additionalInput.x, mux2.additionalInput.y + 15),
  ];

  let memReadNodes = [
    new Node(dm.additionalInputs[1].x + 175, control.outputs[4].y),
    new Node(dm.additionalInputs[1].x, dm.additionalInputs[1].y + 25),
  ];

  let branchNode = new Node(control.outputs[3].x + 265, control.outputs[3].y);

  let aluNodes = [
    new Node(alu1.outputs[0].x + 135, alu1.outputs[0].y),
    new Node(alu2.inputs[0].x - 65, mux5.inputs[0].y),
  ];

  let addToShiftNode = new Node(truncate.additionalInput.x, mux5.inputs[0].y);
  let andOutputNode = new Node(mux5.additionalInput.x, and.output.y);

  pathOrganizer.setComponents([
    pc,
    alu1,
    im,
    topShift,
    control,
    mux1,
    muxJal,
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
    muxJal1,
    muxJR,
  ]);

  pc.output.setWires([
    new Wire({ startNode: pc.output, endNode: im.input }),
    new Wire({ startNode: pc.output, endNode: alu1.inputs[0] }),
  ]);

  im.output.setWires([
    new Wire({
      isManuel: true,
      startNode: im.output,
      endNode: topShift.input,
    }),
    new Wire({
      isManuel: true,
      startNode: im.output,
      endNode: control.input,
    }),
    new Wire({
      isManuel: true,
      startNode: im.output,
      endNode: register.inputs[0],
    }),
    new Wire({
      isManuel: true,
      startNode: im.output,
      endNode: i20Node,
    }),
    new Wire({
      isManuel: true,
      startNode: im.output,
      endNode: mux1.inputs[1],
    }),
    new Wire({
      isManuel: true,
      startNode: im.output,
      endNode: seNode,
    }),
    new Wire({
      isManuel: true,
      startNode: im.output,
      endNode: aluNode,
    }),
    new Wire({
      startNode: i20Node,
      endNode: register.inputs[1],
    }),
    new Wire({
      startNode: i20Node,
      endNode: mux1.inputs[0],
    }),
    new Wire({
      startNode: seNode,
      endNode: signExtend.input,
    }),
    new Wire({
      startNode: aluNode,
      endNode: aluControl.input,
    }),
  ]);

  alu1.outputs[0].setWires([
    new Wire({
      isManuel: true,
      startNode: alu1.outputs[0],
      endNode: aluNodes[0],
    }),
    new Wire({
      isManuel: true,
      startNode: aluNodes[0],
      endNode: addToShiftNode,
      backwards: true,
    }),
    new Wire({
      startNode: aluNodes[0],
      endNode: aluNodes[1],
      backwards: true,
    }),
    new Wire({
      startNode: aluNodes[1],
      endNode: alu2.inputs[0],
      backwards: true,
    }),
    new Wire({
      startNode: aluNodes[1],
      endNode: mux5.inputs[0],
      backwards: true,
    }),
    new Wire({
      startNode: addToShiftNode,
      endNode: truncate.additionalInput,
      backwards: true,
    }),
    new Wire({
      startNode: aluNodes[0],
      endNode: muxJal1.inputs[0],
      backwards: true,
    }),
  ]);

  mux1.output.setWires([
    new Wire({
      startNode: mux1.output,
      endNode: muxJal.inputs[0],
    }),
  ]);

  muxJal.output.setWires([
    new Wire({
      startNode: muxJal.output,
      endNode: register.inputs[2],
    }),
  ]);

  muxJal1.output.setWires([
    new Wire({
      startNode: muxJal1.output,
      endNode: register.inputs[3],
    }),
  ]);

  signExtend.output.setWires([
    new Wire({ startNode: signExtend.output, endNode: shift.input }),
    new Wire({
      startNode: signExtend.output,
      endNode: mux2.inputs[1],
    }),
  ]);

  register.outputs[0].setWires([
    new Wire({
      startNode: register.outputs[0],
      endNode: regNodes[5],
    }),
    new Wire({
      startNode: regNodes[5],
      endNode: alu3.inputs[0],
    }),
    new Wire({
      startNode: regNodes[5],
      endNode: regNodes[6],
      backwards: true,
    }),
    new Wire({
      startNode: regNodes[6],
      endNode: muxJR.inputs[1],
      backwards: true,
    }),
  ]);
  register.outputs[1].setWires([
    new Wire({
      startNode: register.outputs[1],
      endNode: regNodes[4],
    }),
    new Wire({
      startNode: regNodes[4],
      endNode: mux2.inputs[0],
      backwards: true,
    }),
    new Wire({
      startNode: regNodes[4],
      endNode: dm.inputs[1],
      backwards: true,
    }),
  ]);

  mux2.output.setWires([
    new Wire({ startNode: mux2.output, endNode: alu3.inputs[1] }),
  ]);

  alu3.outputs[0].setWires([
    new Wire({
      startNode: alu3.outputs[0],
      endNode: and.inputs[1],
    }),
  ]);
  alu3.outputs[1].setWires([
    new Wire({
      startNode: alu3.outputs[1],
      endNode: alu3SecondNode,
    }),
    new Wire({
      startNode: alu3SecondNode,
      endNode: dm.inputs[0],
      backwards: true,
    }),
    new Wire({
      startNode: alu3SecondNode,
      endNode: mux3.inputs[1],
      backwards: true,
    }),
  ]);

  dm.output.setWires([
    new Wire({ startNode: dm.output, endNode: mux3.inputs[0] }),
  ]);

  mux3.output.setWires([
    new Wire({ startNode: mux3.output, endNode: mux3toReg4_2 }),
    new Wire({
      startNode: mux3toReg4_2,
      endNode: muxJal1.inputs[1],
      backwards: true,
    }),
  ]);

  shift.output.setWires([
    new Wire({ startNode: shift.output, endNode: alu2.inputs[1] }),
  ]);

  truncate.output.setWires([
    new Wire({
      startNode: truncate.output,
      endNode: mux4.inputs[0],
    }),
  ]);

  topShift.output.setWires([
    new Wire({
      startNode: topShift.output,
      endNode: truncate.input,
      backwards: true,
    }),
  ]);

  alu2.outputs[0].setWires([
    new Wire({
      startNode: alu2.outputs[0],
      endNode: mux5.inputs[1],
    }),
  ]);

  mux4.output.setWires([
    new Wire({ startNode: mux4.output, endNode: muxJR.inputs[0] }),
  ]);

  control.outputs[0].setWires([
    new Wire({
      startNode: control.outputs[0],
      endNode: muxJalNodes[0],
      wireColor: colors.SKY,
      text: "Jal",
      textXOffset: 30,
      textYOffset: -5,
    }),
    new Wire({
      startNode: muxJalNodes[0],
      endNode: muxJalNodes[1],
      wireColor: colors.SKY,
      backwards: true,
    }),
    new Wire({
      startNode: muxJalNodes[1],
      endNode: muxJal.additionalInput,
      wireColor: colors.SKY,
      backwards: true,
    }),
    new Wire({
      startNode: muxJalNodes[1],
      endNode: muxJal1.additionalInput,
      wireColor: colors.SKY,
      backwards: true,
    }),
  ]);
  control.outputs[1].setWires([
    new Wire({
      startNode: control.outputs[1],
      endNode: regNodes[0],
      wireColor: colors.SKY,
      text: "RegDest",
      textXOffset: 55,
      textYOffset: -5,
    }),
    new Wire({
      startNode: regNodes[0],
      endNode: regNodes[1],
      backwards: true,
      wireColor: colors.SKY,
    }),
    new Wire({
      startNode: regNodes[1],
      endNode: regNodes[2],
      backwards: true,
      wireColor: colors.SKY,
    }),
    new Wire({
      startNode: regNodes[2],
      endNode: mux1.additionalInput,
      backwards: true,
      wireColor: colors.SKY,
    }),
  ]);
  control.outputs[2].setWires([
    new Wire({
      startNode: control.outputs[2],
      endNode: jumpNodes[0],
      wireColor: colors.SKY,
      text: "Jump",
      textXOffset: 35,
      textYOffset: 2,
    }),
    new Wire({
      startNode: jumpNodes[0],
      endNode: jumpNodes[1],
      backwards: true,
      wireColor: colors.SKY,
    }),
    new Wire({
      startNode: jumpNodes[1],
      endNode: mux4.additionalInput,
      backwards: true,
      wireColor: colors.SKY,
    }),
  ]);
  control.outputs[3].setWires([
    new Wire({
      startNode: control.outputs[3],
      endNode: branchNode,
      wireColor: colors.SKY,
      text: "Branch",
      textXOffset: 35,
      textYOffset: 2,
    }),
    new Wire({
      startNode: branchNode,
      endNode: and.inputs[0],
      wireColor: colors.SKY,
    }),
  ]);
  control.outputs[4].setWires([
    new Wire({
      startNode: control.outputs[4],
      endNode: memReadNodes[0],
      wireColor: colors.SKY,
      text: "MemRead",
      textXOffset: 35,
      textYOffset: 2,
    }),
    new Wire({
      startNode: memReadNodes[0],
      endNode: memReadNodes[1],
      backwards: true,
      wireColor: colors.SKY,
    }),
    new Wire({
      startNode: memReadNodes[1],
      endNode: dm.additionalInputs[1],
      backwards: true,
      wireColor: colors.SKY,
    }),
  ]);
  control.outputs[5].setWires([
    new Wire({
      startNode: control.outputs[5],
      endNode: memToRegNode,
      wireColor: colors.SKY,
      text: "MemToReg",
      textXOffset: 35,
      textYOffset: 2,
    }),
    new Wire({
      startNode: memToRegNode,
      endNode: mux3.additionalInput,
      backwards: true,
      wireColor: colors.SKY,
    }),
  ]);
  control.outputs[6].setWires([
    new Wire({
      startNode: control.outputs[6],
      endNode: aluOpNode,
      wireColor: colors.SKY,
      text: "ALUOp",
      textXOffset: 15,
    }),
    new Wire({
      startNode: aluOpNode,
      endNode: aluControl.additionalInput,
      backwards: true,
      wireColor: colors.SKY,
    }),
  ]);
  control.outputs[7].setWires([
    new Wire({
      startNode: control.outputs[7],
      endNode: memWriteNode,
      wireColor: colors.SKY,
      text: "MemWrite",
      textXOffset: 40,
      textYOffset: 2,
    }),
    new Wire({
      startNode: memWriteNode,
      endNode: dm.additionalInputs[0],
      backwards: true,

      wireColor: colors.SKY,
    }),
  ]);
  control.outputs[8].setWires([
    new Wire({
      startNode: control.outputs[8],
      endNode: aluSrcNodes[0],
      wireColor: colors.SKY,
      text: "ALUSrc",
      textXOffset: 50,
      textYOffset: 2,
    }),
    new Wire({
      startNode: aluSrcNodes[0],
      endNode: aluSrcNodes[1],
      backwards: true,
      wireColor: colors.SKY,
    }),
    new Wire({
      startNode: aluSrcNodes[1],
      endNode: mux2.additionalInput,
      backwards: true,
      wireColor: colors.SKY,
    }),
  ]);
  control.outputs[9].setWires([
    new Wire({
      startNode: control.outputs[9],
      endNode: regNodes[3],
      backwards: true,
      wireColor: colors.SKY,
      text: "RegWrite",
      textXOffset: 75,
      textYOffset: 20,
    }),
    new Wire({
      startNode: regNodes[3],
      endNode: register.additionalInput,
      backwards: true,
      wireColor: colors.SKY,
    }),
  ]);

  aluControl.output.setWires([
    new Wire({
      startNode: aluControl.output,
      endNode: aluCToJrNode,
      wireColor: colors.SKY,
      isManuel: true,
      isGradient: true,
    }),
    new Wire({
      startNode: aluControl.output,
      endNode: aluCOutputNode,
    }),
    new Wire({
      startNode: aluCOutputNode,
      endNode: alu3.additionalInput,
      backwards: true,
    }),
    new Wire({
      startNode: aluCToJrNode,
      endNode: muxJR.additionalInput,
      backwards: true,
      wireColor: colors.SKY,
      text: "JumpReg",
    }),
  ]);

  and.output.setWires([
    new Wire({
      startNode: and.output,
      endNode: andOutputNode,
    }),
    new Wire({
      startNode: andOutputNode,
      endNode: mux5.additionalInput,
      backwards: true,
    }),
  ]);

  mux5.output.setWires([
    new Wire({ startNode: mux5.output, endNode: mux4.inputs[1] }),
  ]);

  muxJR.output.setWires([
    new Wire({
      startNode: muxJR.output,
      endNode: muxJRtoPc_1,
    }),
    new Wire({
      startNode: muxJRtoPc_1,
      endNode: pc.input,
      backwards: true,
    }),
  ]);

  pathOrganizer.setWires();
  pathOrganizer.setPoints([
    new Point(pc.output.x + 25, pc.output.y),
    new Point(im.output.x + 50, register.inputs[1].y),
    new Point(signExtend.output.x + 25, mux2.inputs[1].y),
    new Point(register.outputs[1].x + 20, register.outputs[1].y),
    new Point(alu3SecondNode.x, alu3SecondNode.y),
    new Point(originX + 425, originY + 558),
    new Point(aluNodes[1].x, aluNodes[1].y),
    new Point(addToShiftNode.x, addToShiftNode.y),
    new Point(regNodes[5].x, regNodes[5].y),
    new Point(aluCOutputNode.x, aluCOutputNode.y),
    new Point(aluNodes[0].x, aluNodes[0].y),
    new Point(muxJalNodes[1].x, muxJalNodes[1].y, colors.SKY),
  ]);
}
