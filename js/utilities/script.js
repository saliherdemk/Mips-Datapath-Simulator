function incrementPageNumber() {
  addressOrganizer.incrementCurrentPage();
}

function decrementPageNumber() {
  addressOrganizer.decrementCurrentPage();
}

function setInstruction(e) {
  instructionInputs.changeInputs(e.target.value);
}

function toggleRegisters() {
  registerInputs.toggleRegisters();
}

//
function setRegisters(e) {
  e.preventDefault();
  registerInputs.setRegisters();
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

// Resize for Adress Book (https://jsfiddle.net/pksurya/uhd963xa/30/)
function initResize() {
  window.addEventListener("mousemove", resize, false);
  window.addEventListener("mouseup", stopResize, false);
}

function resize(e) {
  addressBookContainer.style.width =
    Math.max(e.clientX - addressBookContainer.offsetLeft, 330) + "px";
  addressBookContainer.style.height =
    Math.max(e.clientY - addressBookContainer.offsetTop, 95) + "px";
}

function stopResize() {
  window.removeEventListener("mousemove", resize, false);
  window.removeEventListener("mouseup", stopResize, false);
}

function shrinkBook() {
  addressBookContainer.style.width = "330px";
  addressBookContainer.style.height = "95px";
  addressBookContainer.style.top = "0px";
  addressBookContainer.style.left = "0px";
}

let offsetX, offsetY;

// Draggable Address Book
function mouseDownDraggable(e) {
  offsetX = e.clientX - addressBookContainer.offsetLeft;
  offsetY = e.clientY - addressBookContainer.offsetTop;
  window.addEventListener("mousemove", drag);
}

function drag(e) {
  addressBookContainer.style.left = e.clientX - offsetX + "px";
  addressBookContainer.style.top = e.clientY - offsetY + "px";
}

window.addEventListener("mouseup", () => {
  window.removeEventListener("mousemove", drag);
});

// Empty Selected Address Events for animation

function handleAnimationEnd() {
  selectedAddressContainer.classList.remove("jump-shaking");
}

selectedAddressContainer.addEventListener("animationend", handleAnimationEnd);
