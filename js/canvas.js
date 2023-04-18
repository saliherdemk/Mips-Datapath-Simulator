var components = [];
var wires = [];

function createComponents() {
  let originX = (windowWidth - 1000) / 2;
  let originY = (windowHeight - 750) / 2;

  let pc = new Pc(originX + 50, originY + 300);
  let alu1 = new Alu(originX + 200, originY + 100, true);
  let alu2 = new Alu(originX + 650, originY + 100, true);
  let alu3 = new Alu(originX + 650, originY + 300, false);
  let im = new InstructionMemory(originX + 150, originY + 300);
  let register = new Registers(originX + 400, originY + 300);
  let dm = new DataMemory(originX + 825, originY + 300);
  let mux1 = new Mux(originX + 325, originY + 360);
  let mux2 = new Mux(originX + 580, originY + 390);
  let mux3 = new Mux(originX + 975, originY + 400);
  let mux4 = new Mux(originX + 850, originY + 75);
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
    mux4
  );

  wires.push(
    new Wire(pc.output, im.input),
    new Wire(pc.output, alu1.inputs[0]),
    new Wire(im.output, register.inputs[0]),
    new Wire(im.output, register.inputs[1]),
    new Wire(im.output, mux1.inputs[1])
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createComponents();
}

function draw() {
  for (let i = 0; i < wires.length; i++) {
    wires[i].draw();
  }

  for (let i = 0; i < components.length; i++) {
    components[i].draw();
  }
}
