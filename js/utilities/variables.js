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
const valuesContainer = document.getElementById("valuesContainer");

const organizer = new Organizer();

const hexDigits = {
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F",
};

const colors = {}; // See initColors function in script.js

const originX = 120;
const originY = 25;

var components = [];
var wires = [];
var points = [];
var nodes = [];
var pc;
var register;
var currId = 0;
