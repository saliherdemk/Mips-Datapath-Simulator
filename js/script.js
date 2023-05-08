var regInput1 = [...document.querySelectorAll(".reg-input-1")];
var regInput2 = [...document.querySelectorAll(".reg-input-2")];
var input3Label = document.getElementById("input3-label");
var regSelects = document.querySelectorAll(".reg-select");
var regInputContainer = document.getElementById("reg-input-container");
var instruction = "Add";
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
  instFormInputs.forEach((inp) => {
    if (!inp.parentElement.classList.contains("hidden")) {
      console.log(inp.value);
    }
  });
  // let instructionParts = instruction.replaceAll("$", "").split(" ");

  // let instructionCode = opCodes[instructionParts[0]];
  // if (instructionParts.length == 2) {
  //   instructionCode += dectoBin(instructionParts[1], 27);
  // } else if (instructionParts.length == 4) {
  //   instructionCode += dectoBin(instructionParts[2], 5);
  //   instructionCode += dectoBin(instructionParts[3], 5);
  //   instructionCode += dectoBin(instructionParts[1], 5);
  // }
}

function dectoBin(num, size) {
  let bin = Number(num).toString(2);
  while (bin.length < size) {
    bin = "0" + bin;
  }
  return bin;
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
