class RegisterManager {
  toggleRegisters() {
    if (container.getAttribute("isExpanded") == "true") {
      container.style.maxHeight = "0px";
      container.setAttribute("isExpanded", "false");
      return;
    }

    container.style.maxHeight = "500px";
    container.setAttribute("isExpanded", "true");
  }

  setRegisters() {
    const formData = new FormData(regForm);
    organizer.setRegValues([...formData.values()]);
  }

  updateRegisters(regValues) {
    let regs = regInputContainer.children;
    for (let i = 0; i < regValues.length; i++) {
      regs[i + 1].children[1].querySelector("input").value = regValues[i];
    }
    organizer.setRegValues(regValues);
  }
}
