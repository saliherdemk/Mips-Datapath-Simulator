var regInput1 = [...document.querySelectorAll(".reg-input-1")];
var regInput2 = [...document.querySelectorAll(".reg-input-2")];
var input3Label = document.getElementById("input3-label");
var regSelects = document.querySelectorAll(".reg-select");
var regInputContainer = document.getElementById("reg-input-container");
var instructionCode;
var instruction = "add";
var regForm = document.getElementById("reg-form");
var instFormInputs = document.querySelectorAll(".inst-form-input");
var regValues = [];

function setSelectOptions() {
  regSelects.forEach((regSelect) => {
    for (let i = 1; i < 32; i++) {
      let opt = document.createElement("option");
      opt.value = i;
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
    inp.classList.add("text-center", "border-2", "rounded", "mb-1");
    inpInnerContainer.append(inp);
    inpContainer.append(p);
    inpContainer.append(inpInnerContainer);
    regInputContainer.append(inpContainer);
  }
}

function setInstruction(e) {
  instruction = e.target.value;
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
  if (instruction == "jr") {
    showInput([0]);
  } else if (["j", "jal"].includes(instruction)) {
    showInput[0];
    showSecondInput(0);
  } else if (instruction == "addi") {
    showInput([0, 1, 2]);
    showSecondInput(2);
  } else if (["lw", "sw"].includes(instruction)) {
    showInput([0, 1, 2]);
    showSecondInput(1);
  } else if (instruction == "beq") {
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
  console.log(inpValues);

  let instructionCode = opCodes[inpValues[0]] + " ";
  if (inpValues.length == 2 && instruction == "j") {
    instructionCode += dectoBin(inpValues[1], 27);
  } else if (inpValues.length == 2 && instruction == "jr") {
    instructionCode += dectoBin(inpValues[1], 5);
    instructionCode += "00000 00000 00000 ";
    instructionCode += functionBits[inpValues[0]];
  } else if (inpValues.length == 4) {
    instructionCode += dectoBin(inpValues[2], 5);
    instructionCode += dectoBin(inpValues[3], 5);
    instructionCode += dectoBin(inpValues[1], 5);
    instructionCode += "00000 ";
    instructionCode += functionBits[inpValues[0]];
  }
  console.log(instructionCode);
}

function dectoBin(num, size) {
  let bin = Number(num).toString(2);
  while (bin.length < size) {
    bin = "0" + bin;
  }
  return bin + " ";
}

function toggleForm() {
  if (regs.getAttribute("isExpanded") == "true") {
    regs.style.maxHeight = "0px";
    regs.setAttribute("isExpanded", "false");
  } else {
    regs.style.maxHeight = "400px";
    regs.setAttribute("isExpanded", "true");
  }
}

function setRegisters(e) {
  e.preventDefault();
  const formData = new FormData(regForm);
  regValues = [...formData.values()];
  console.log(formData, regValues);
}
