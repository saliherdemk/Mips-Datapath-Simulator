function setup() {
  cnv = createCanvas(1300, 750);
  cnv.parent(select("#canvas-container"));

  initColors();
  initNodesForLejant();
}

function draw() {
  background(colors.WHITE);
  drawNodes();
  seeLejant();
}

function initNodesForLejant() {
  globalNodes.push(
    new Node(500, 100, false),
    new Node(500, 130, true),
    new Node(500, 160, "true")
  );
  let a = new Node(500, 250, true);
  a.setDontCare(true);
  let b = new Node(500, 220, false);
  b.setDontCare(true);
  let c = new Node(500, 190, "true");
  c.setDontCare(true);
  globalNodes.push(a, b, c);
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

  textSize(17);

  text("Address Book", 490, 300);

  fill(147, 197, 253);
  rect(490, 330, 60, 20, 20);
  fill(0);
  text("Curent Address - Will Execute", 560, 345);
  fill(134, 239, 172);
  rect(490, 370, 60, 20, 20);
  fill(0);
  text("Selected Address - Put value", 560, 385);
}
