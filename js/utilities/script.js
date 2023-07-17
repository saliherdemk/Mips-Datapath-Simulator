function setSelectOptions() {
  regSelects.forEach((regSelect) => {
    for (let i = 1; i < 32; i++) {
      let opt = document.createElement("option");
      opt.value = "$" + i;
      opt.innerHTML = "$" + i;
      regSelect.append(opt);
    }
  });
}

function setRegInputs() {
  for (let i = 1; i < 32; i++) {
    let inpContainer = document.createElement("div");
    inpContainer.classList.add("border-2");
    let p = document.createElement("p");
    p.classList.add("text-center");
    p.innerText = "$" + i;
    let inpInnerContainer = document.createElement("div");
    inpInnerContainer.classList.add("text-center");
    let inp = document.createElement("input");
    inp.setAttribute("type", "text");
    inp.setAttribute("placeholder", "..");
    inp.setAttribute("size", "2");
    inp.setAttribute("maxlength", "2");
    inp.setAttribute("name", "reg-" + i);
    inp.setAttribute("value", 0);
    inp.classList.add("text-center", "border-2", "rounded", "mb-1");
    inpInnerContainer.append(inp);
    inpContainer.append(p);
    inpContainer.append(inpInnerContainer);
    regInputContainer.append(inpContainer);
  }
}

function setInstruction(e) {
  organizer.setInstruction(e.target.value);
  setInputs();
}

function resetInputs() {
  [...regInput1, ...regInput2].map((inp) => inp.classList.add("hidden"));
  input3Label.innerText = "Immediate";
}

function showInput(indexes) {
  indexes.map((index) => {
    regInput1[index].classList.remove("hidden");
  });
}

function showSecondInput(index) {
  regInput1[index].classList.add("hidden");
  regInput2[index].classList.remove("hidden");
}

function setInputs() {
  resetInputs();
  let instruction = organizer.getInstruction();
  if (instruction == "Jr") {
    showInput([0]);
  } else if (["J", "Jal"].includes(instruction)) {
    showInput[0];
    showSecondInput(0);
  } else if (instruction == "Addi") {
    showInput([0, 1, 2]);
    showSecondInput(2);
  } else if (["Lw", "Sw"].includes(instruction)) {
    showInput([0, 1, 2]);
    showSecondInput(1);
  } else if (instruction == "Beq") {
    showInput([0, 1, 2]);
    showSecondInput(2);
    input3Label.innerText = "Target";
  } else {
    showInput([0, 1, 2]);
  }
}

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

function toggleForm() {
  if (container.getAttribute("isExpanded") == "true") {
    container.style.maxHeight = "0px";
    container.setAttribute("isExpanded", "false");
    return;
  }

  container.style.maxHeight = "500px";
  container.setAttribute("isExpanded", "true");
}

function setRegisters(e) {
  e.preventDefault();
  const formData = new FormData(regForm);
  organizer.setRegValues([...formData.values()]);
}

function updateRegisters(regValues) {
  let regs = regInputContainer.children;
  for (let i = 0; i < regValues.length; i++) {
    regs[i + 1].children[1].querySelector("input").value = regValues[i];
  }
  organizer.setRegValues(regValues);
}

function updateMemories() {
  let tempContainer = document.createElement("div");
  let memValues = organizer.getMemValues();
  for (const [key, value] of Object.entries(memValues)) {
    let con = document.createElement("div");
    con.classList.add("flex");
    let child1 = document.createElement("div");
    child1.classList.add("border-2", "border-gray-500", "border-r-0", "p-3");
    child1.innerText = key;
    let child2 = document.createElement("div");
    child2.classList.add("border-2", "border-gray-500", "p-3");
    child2.innerText = value;
    con.append(child1, child2);
    tempContainer.append(con);
  }
  memContainer.innerHTML = tempContainer.innerHTML;
}

function openPopups() {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].openPopup();
  }
}

function closePopups() {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].closePopup();
  }
}
function gradientLine(x1, y1, x2, y2, color1, color2) {
  var grad = this.drawingContext.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);

  this.drawingContext.strokeStyle = grad;
}

function findWiresByEndNodeId(nodeId) {
  return wires.find((wire) => wire.endNode.id == nodeId);
}

function findNodeById(id) {
  return nodes.find((node) => node.id == id);
}

function toggleLejant() {
  lejant.classList.toggle("hidden");
}

function toggleValuesContainer() {
  valuesContainer.classList.toggle("translate-x-0");
}

// p5.js functions can't access before the setup function. That's why this function must be called in setup.
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
