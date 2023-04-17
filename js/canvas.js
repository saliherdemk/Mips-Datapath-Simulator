var components = [];

function createComponents() {
  let originX = (windowWidth - 1000) / 2;
  let originY = (windowHeight - 750) / 2;
  components.push(new Pc(originX + 50, originY + 300));
  components.push(new Alu(originX + 200, originY + 100, true));
  components.push(new Alu(originX + 650, originY + 100, true));
  components.push(new Alu(originX + 650, originY + 300, false));
  components.push(new InstructionMemory(originX + 200, originY + 300));
  components.push(new Registers(originX + 400, originY + 300));
  components.push(new DataMemory(originX + 825, originY + 300));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createComponents();
}

function draw() {
  for (let i = 0; i < components.length; i++) {
    components[i].draw();
  }
}
