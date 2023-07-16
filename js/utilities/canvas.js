function setup() {
  cnv = createCanvas(1300, 750);
  cnv.parent(select("#canvas-container"));
  frameRate(30);

  setSelectOptions();
  setRegInputs();
  initColors();
  initDatapath();
  // initNodesForLejant();
}

function draw() {
  background(colors.WHITE);

  // seeLejant();

  noFill();
  for (let i = 0; i < wires.length; i++) {
    wires[i].draw();
  }
  fill(colors.WHITE);

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
  fill(colors.BLACK);

  stroke(colors.BLACK);
  strokeWeight(1);

  textSize(17);
  text("Click Node to toggle popup visibilty", 490, 50);

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
