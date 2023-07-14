class Node {
  constructor(x, y, value = false, popUpDirection = "top") {
    this.x = x;
    this.y = y;
    this.value = value;
    this.colorValue = color(255, 0, 0);
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
      let nodeWires = findWiresByEndNodeId(this.id);

      nodeWires?.startNode.setDontCare(true);
    }
    this.changeValue(this.value);
  }

  changeValue(value) {
    this.value = value;
    this.hasValue = value !== false && value !== true;
    this.colorValue = this.isDontCare
      ? color(0, 255, 255)
      : this.hasValue
      ? color(0, 0, 255)
      : value
      ? color(0, 255, 0)
      : color(255, 0, 0);

    value.length > 6 &&
      organizer.updateValueTable(this.id, [binToHex(value), value]);
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
    let [pX, pY] = [0, 0]; // popup target coordinates

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

    fill(this.isHighlighted ? color(251, 255, 113) : 255);
    rect(x, y, width + 10, 30, 20);

    gradientLine(this.x, this.y, pX, pY, this.colorValue, color(255));
    line(this.x, this.y, pX, pY);

    fill(0);
    noStroke();
    textSize(13);
    text(val, x + 10, y + 20);

    stroke(0);
    strokeWeight(2);
  }

  show() {
    fill(this.colorValue);
    ellipse(this.x, this.y, 14);
    if (this.isDontCare && !this.hasValue) {
      strokeWeight(1);
      fill(this.value ? color(0, 255, 0) : color(255, 0, 0));
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
