const regInput1 = [...document.querySelectorAll(".reg-input-1")];
const regInput2 = [...document.querySelectorAll(".reg-input-2")];
const input3Label = document.getElementById("input3-label");
const regSelects = document.querySelectorAll(".reg-select");
const regInputContainer = document.getElementById("reg-input-container");
const memContainer = document.getElementById("mem-container");

const colors = {}; // See initColors function in script.js

var globalNodes = [];
var currId = 0; // Each node must have unique id. It's just counting.
