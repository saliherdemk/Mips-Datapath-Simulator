function incrementPageNumber() {
  addressOrganizer.incrementCurrentPage();
}

function decrementPageNumber() {
  addressOrganizer.decrementCurrentPage();
}

function setInstruction(e) {
  instructionManager.changeInputs(e.target.value);
}

function toggleRegisters() {
  registerManager.toggleRegisters();
}

function setRegisters(e) {
  e.preventDefault();
  registerManager.setRegisters();
}

function openPopups() {
  pathOrganizer.openPopups();
}

function closePopups() {
  pathOrganizer.closePopups();
}

function toggleLejant() {
  lejant.classList.toggle("hidden");
}

function toggleValuesContainer() {
  valuesContainer.classList.toggle("translate-x-0");
}

function changeSpeed(e) {
  organizer.setAutomationSpeed(e.target.value);
  speedValueContainer.innerText = e.target.value + "ms";
}

// Empty Selected Address Events for animation

function handleAnimationEnd() {
  selectedAddressContainer.classList.remove("jump-shaking");
}

selectedAddressContainer.addEventListener("animationend", handleAnimationEnd);
