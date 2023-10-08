function dectoBin(num, size) {
  let bin = (Number(num) >>> 0).toString(2);
  while (bin.length < size) {
    bin = "0" + bin;
  }
  return bin;
}

function binToDec(bin) {
  return parseInt(bin, 2);
}

function binToHex(bin) {
  while (bin.length % 4) {
    bin = "0" + bin;
  }
  let hex = "";
  bin.match(/.{4}/g).forEach((b) => {
    let d = binToDec(b);
    hex += hexDigits[d] || d;
  });
  return "0x" + hex;
}

function gradientLine(x1, y1, x2, y2, color1, color2) {
  var grad = this.drawingContext.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);

  this.drawingContext.strokeStyle = grad;
}

function getElementByAttribute(attr, value) {
  return document.querySelector(`[${attr}="${value}"]`);
}

function removeClassFromChildren(element, className) {
  element?.children.forEach((el) => {
    el.classList.remove(className);
  });
}

function addClassToChildren(element, className) {
  element?.children.forEach((el) => {
    el.classList.add(className);
  });

  element?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

function showPlayIcon() {
  pauseIcon.classList.remove("hidden");
  playIcon.classList.add("hidden");
}

function showPauseIcon() {
  pauseIcon.classList.add("hidden");
  playIcon.classList.remove("hidden");
}
