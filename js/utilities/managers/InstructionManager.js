class InstructionManager {
  showInput(indexes) {
    indexes.map((index) => {
      regInput1[index].classList.remove("hidden");
    });
  }

  showSecondInput(index) {
    regInput1[index].classList.add("hidden");
    regInput2[index].classList.remove("hidden");
  }

  resetInputs() {
    [...regInput1, ...regInput2].map((inp) => inp.classList.add("hidden"));
    input3Label.innerText = "Immediate";
  }

  changeInputs(instruction) {
    this.resetInputs();
    if (instruction == "Jr") {
      this.showInput([0]);
    } else if (["J", "Jal"].includes(instruction)) {
      this.showInput[0];
      this.showSecondInput(0);
    } else if (instruction == "Addi") {
      this.showInput([0, 1, 2]);
      this.showSecondInput(2);
    } else if (["Lw", "Sw"].includes(instruction)) {
      this.showInput([0, 1, 2]);
      this.showSecondInput(1);
    } else if (instruction == "Beq") {
      this.showInput([0, 1, 2]);
      this.showSecondInput(2);
      input3Label.innerText = "Target";
    } else {
      this.showInput([0, 1, 2]);
    }
  }
}
