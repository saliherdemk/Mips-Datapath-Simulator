const colors = {};

// p5.js functions can't access before the setup function. That's why this function must be called in setup.
function initColors() {
  colors.SKY = color(5, 176, 239);
  colors.WHITE = color(255);
  colors.RED = color(255, 0, 0);
  colors.LIGHTBLUE = color(0, 255, 255);
  colors.DARKBLUE = color(0, 0, 255);
  colors.GREEN = color(0, 255, 0);
  colors.BLACK = color(0);
  colors.YELLOW = color(251, 255, 113);
}
