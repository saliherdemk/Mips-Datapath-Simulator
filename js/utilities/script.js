function drawNodes() {
  for (let i = 0; i < globalNodes.length; i++) {
    globalNodes[i].draw();
  }
}
function initColors() {
  colors.SKY = color(5, 176, 239);
  colors.WHITE = color(255);
  colors.RED = color(255, 0, 0);
  colors.LIGHTBLUE = color(0, 255, 255);
  colors.DARKBLUE = color(0, 0, 255);
  colors.GREEN = color(0, 255, 0);
  colors.BLACK = color(0);
  colors.YELLOW = color(255, 255, 0);
}
