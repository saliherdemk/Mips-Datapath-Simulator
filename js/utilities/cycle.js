function startCycle(e) {
  e.preventDefault();
  setMachineCode();
  organizer.updatePcValues();
  goOneCycle();
}

function resetDataPath() {
  organizer.setValueTable({});

  components.map((c) => (c.isVisited = false));
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].setDontCare(false);
  }
}

function goOneCycle() {
  resetDataPath();
  for (let i = 0; i < components.length; i++) {
    components[i].update();
    components[i].updateWires();
  }
  register.update(true);

  for (let i = components.length - 1; i >= 0; i--) {
    components[i].updateDontCare();
  }

  for (let i = 0; i < nodes.length; i++) {
    nodes[i].addNodeToValueTable();
  }

  updateValuesContainer();
}

function setMachineCode() {
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
  instructionCodeContainer.innerText = organizer.getICode();
}

function updateValuesContainer() {
  const aside = valuesContainer.children[1]; // gets aside tag
  aside.innerHTML = "";
  let table = organizer.getValueTable();
  for (const [key, value] of Object.entries(table)) {
    let d1 = document.createElement("div");
    d1.setAttribute("node-id", key);
    d1.classList.add(
      "border-2",
      "m-4",
      "bg-white",
      "rounded",
      "hover:shadow-lg"
    );

    d1.addEventListener("mouseover", () => {
      findNodeById(key).setIsHighlighted(true);
    });

    d1.addEventListener("mouseleave", () => {
      findNodeById(key).setIsHighlighted(false);
    });

    let d2 = document.createElement("div");
    d2.innerText = value[0];
    d2.classList.add("border-b-2", "p-2");

    let d3 = document.createElement("div");
    d3.innerText = value[1] + "\n" + value[1].length + " bits";
    d3.classList.add("p-4");

    d1.append(d2, d3);
    aside.append(d1);
  }
}
