const regInput1 = [...document.querySelectorAll(".reg-input-1")];
const regInput2 = [...document.querySelectorAll(".reg-input-2")];
const input3Label = document.getElementById("input3-label");
const regSelects = document.querySelectorAll(".reg-select");
const regInputContainer = document.getElementById("reg-input-container");
const memContainer = document.getElementById("mem-container");

const container = document.getElementById("container");
const regForm = document.getElementById("reg-form");
const instFormInputs = document.querySelectorAll(".inst-form-input");

const lejant = document.getElementById("lejant");
const valuesContainer = document.getElementById("valuesContainer");

const addressBookContainer = document.getElementById("address-book");
const addressTable = document.getElementById("address-body");

const pageCounterSpan = document.getElementById("page-counter");
const selectedAddressContainer = document.getElementById("selected-address");

const playIcon = document.querySelector(".play");
const pauseIcon = document.querySelector(".pause");

const initilizer = new Initilizer();

const instructionManager = new InstructionManager();
const registerManager = new RegisterManager();
const memoryManager = new MemoryManager();
const bookManager = new BookManager();

const organizer = new Organizer();
const pathOrganizer = new PathOrganizer();
const addressOrganizer = new AddressOrganizer();

const hexDigits = {
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F",
};

const colors = {}; // See initColors function in script.js

var currId = 0; // Each node must have unique id. It's just counting.
