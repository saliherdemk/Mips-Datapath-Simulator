const regInput1 = [...document.querySelectorAll(".reg-input-1")];
const regInput2 = [...document.querySelectorAll(".reg-input-2")];
const input3Label = document.getElementById("input3-label");
const regSelects = document.querySelectorAll(".reg-select");
const regInputContainer = document.getElementById("reg-input-container");
const memContainer = document.getElementById("mem-container");

const container = document.getElementById("container");
const regForm = document.getElementById("reg-form");
const instFormInputs = document.querySelectorAll(".inst-form-input");
const instructionCodeContainer = document.getElementById("instruction-code");

const lejant = document.getElementById("lejant");

const organizer = new Organizer();

function startCycle(code) {
  organizer.updatePcValues(code);
  goOneCycle();
}

function goOneCycle() {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].setDontCare(false);
  }
  for (let i = 0; i < components.length; i++) {
    // setTimeout(() => {
    components[i].update();
    components[i].updateWires();
    components[i].isVisited = true;
    // }, i * 200);
  }
  register.update(true);

  for (let i = components.length - 1; i >= 0; i--) {
    components[i].updateDontCare();
  }
}

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

function updateIC() {
  instructionCodeContainer.innerText = organizer.getICode();
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

function go(e) {
  e.preventDefault();
  let inpValues = [];
  instFormInputs.forEach((inp) => {
    if (!inp.parentElement.classList.contains("hidden")) {
      inpValues.push(inp.value);
    }
  });
  let instruction = organizer.setInstruction(inpValues[0]).toLowerCase();
  let opCode = opCodes[instruction];
  let icArray = [opCode];
  let codeLength = 6;
  let iData;

  const type =
    opCode === "000000"
      ? "R"
      : opCode === "000010" || opCode === "000011"
      ? "J"
      : "I";

  for (let i = 1; i < inpValues.length; i++) {
    const element = inpValues[i].split("$");
    if (element.length == 2) {
      icArray.push(dectoBin(element[1], 5));
      codeLength += 5;
    } else {
      iData = element[0];
    }
  }

  if (opCode != "000100" && opCode != "000010" && opCode != "000011") {
    icArray.push(icArray.splice(1, 1)[0]);
  }
  if (type == "R") {
    let funcCode = functionBits[instruction];
    icArray.push(dectoBin(0, 5));
    icArray.push(funcCode);
    if (funcCode == "001000") {
      icArray.splice(3, 0, dectoBin(0, 5));
      icArray.splice(3, 0, dectoBin(0, 5));
      codeLength += 10;
    }
    codeLength += 5 + funcCode.length;
  }

  if (iData) {
    icArray.push(dectoBin(iData, 32 - codeLength));
  }

  organizer.setICode(icArray.join(" "));
  updateIC();
  startCycle(organizer.getICode());
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
  let hex = parseInt(bin, 2).toString(16).toUpperCase();
  while (hex.length < 8) {
    hex = "0" + hex;
  }
  return "0x" + hex;
}

// function hexToBin(hex, size) {
//   bin = parseInt(hex.substring(2), 16).toString(2);
//   while (bin.length < size) {
//     bin = "0" + bin;
//   }
//   return bin;
// }

function toggleForm() {
  if (container.getAttribute("isExpanded") == "true") {
    container.style.maxHeight = "0px";
    container.setAttribute("isExpanded", "false");
  } else {
    container.style.maxHeight = "500px";
    container.setAttribute("isExpanded", "true");
  }
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

function findWiresByEndNode(node) {
  return wires.find((wire) => wire.endNode == node);
}

function toggleLejant() {
  lejant.classList.toggle("hidden");
}
