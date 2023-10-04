class Initilizer {
  constructor() {}

  initAddresses() {
    for (let i = 0; i < 100; i += 4) {
      let tr = document.createElement("tr");
      tr.classList.add("p-4");
      let addressTd = document.createElement("td");
      addressTd.classList.add("sticky", "left-0");

      // see style.css 79
      let valueTd = document.createElement("td");

      let meanTd = document.createElement("td");

      let controlsTd = document.createElement("td");
      controlsTd.classList.add("sticky", "right-0");

      tr.append(addressTd, valueTd, meanTd, controlsTd);
      tr.onclick = () => {
        addressOrganizer.toggleSelectedAddress(tr.children[0].innerText);
        tr.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      };

      addressTable.append(tr);
    }
  }

  setSelectOptions() {
    regSelects.forEach((regSelect) => {
      for (let i = 1; i < 32; i++) {
        let opt = document.createElement("option");
        opt.value = "$" + i;
        opt.innerHTML = "$" + i;
        regSelect.append(opt);
      }
    });
  }

  setRegInputs() {
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
  // p5.js functions can't access before the setup function. That's why this function must be called in setup.
  initColors() {
    colors.SKY = color(5, 176, 239);
    colors.WHITE = color(255);
    colors.RED = color(255, 0, 0);
    colors.LIGHTBLUE = color(0, 255, 255);
    colors.DARKBLUE = color(0, 0, 255);
    colors.GREEN = color(0, 255, 0);
    colors.BLACK = color(0);
    colors.YELLOW = color(255, 255, 0);
  }

  init() {
    this.initAddresses();
    this.setSelectOptions();
    this.setRegInputs();
    this.initColors();
    initDatapath();
  }
}
