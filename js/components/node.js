class Node {
  constructor(x, y, value = false, popUpDirection = "top") {
    this.x = x;
    this.y = y;
    this.value = value;
    this.colorValue = colors.RED;
    this.isPopupOpen = false;
    this.popUpDirection = popUpDirection;
    this.rollover = false;
    this.hasValue = false;
    this.isDontCare = false;
    this.isHighlighted = false;
    this.wires = [];
    this.id;
    this.changeValue(value);
    this.setId();
  }

  setId() {
    this.id = currId;
    currId += 1;
  }

  setIsHighlighted(value) {
    this.isHighlighted = value;
  }

  setDontCare(value) {
    this.isDontCare = value;
    if (this.isDontCare) {
      this.wires?.forEach((w) => {
        if (!w.endNode.isDontCare) {
          this.setDontCare(false);
          return;
        }
      });
    }
    this.changeValue(this.value);
  }

  changeValue(value) {
    this.value = value;
    this.hasValue = value !== false && value !== true;
    this.colorValue = this.isDontCare
      ? colors.LIGHTBLUE
      : this.hasValue
      ? colors.DARKBLUE
      : value
      ? colors.GREEN
      : colors.RED;
  }

  addNodeToValueTable() {
    this.value.length > 6 &&
      organizer.updateValueTable(this.id, [binToHex(this.value), this.value]);
  }

  setWires(wires) {
    this.wires = wires;
  }

  dist() {
    return (this.x - mouseX) ** 2 + (this.y - mouseY) ** 2;
  }

  update() {
    let d = this.dist();
    this.rollover = d < 40 && d > 0;
  }

  onClick() {
    if (this.rollover) {
      this.isPopupOpen = !this.isPopupOpen;
      this.rollover = false;
    }
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  showPopup() {
    let val = this.value.length > 6 ? binToHex(this.value) : this.value;
    let width = val.length * 8 + (val.length < 8 ? 10 : 0);
    let [x, y] = [0, 0];
    let [pX, pY] = [0, 0]; // target popup coordinates

    switch (this.popUpDirection) {
      case "top":
        x = this.x - width / 2 - 5;
        y = this.y - 40;
        pX = this.x;
        pY = y + 20;
        break;
      case "bottom":
        x = this.x - width / 2 - 5;
        y = this.y + 10;
        pX = this.x;
        pY = y + 10;
        break;
      case "left":
        x = this.x - width - 20;
        y = this.y - 15;
        pX = this.x - 20;
        pY = this.y;
        break;
      case "right":
        x = this.x + 10;
        y = this.y - 15;
        pX = this.x + 20;
        pY = this.y;
        break;
    }

    fill(this.isHighlighted ? colors.YELLOW : colors.WHITE);
    rect(x, y, width + 10, 30, 20);

    gradientLine(this.x, this.y, pX, pY, this.colorValue, colors.WHITE);
    line(this.x, this.y, pX, pY);

    fill(colors.BLACK);
    noStroke();
    textSize(13);
    text(val, x + 10, y + 20);

    stroke(colors.BLACK);
    strokeWeight(2);
  }

  show() {
    fill(this.colorValue);
    ellipse(this.x, this.y, 14);
    if (this.isDontCare && !this.hasValue) {
      strokeWeight(1);
      fill(this.value ? colors.GREEN : colors.RED);
      arc(this.x, this.y, 14, 14, HALF_PI, PI + HALF_PI, PIE);
    }
    strokeWeight(2);

    noFill();
    this.hasValue &&
      (this.isPopupOpen || this.rollover || this.isHighlighted) &&
      this.showPopup();
  }

  draw() {
    this.show();
    this.update();
  }
}
