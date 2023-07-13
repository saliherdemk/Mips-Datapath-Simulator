class Organizer {
  constructor() {
    this.instructionCode = "";
    this.instruction = "add";
    this.regValues = Array(31).fill("0");
    this.memValues = [];
    this.pcValues = {};
    this.currAddress = "00000000000000000000000101011000";
    this.valueTable = {};
  }

  setICode(code) {
    this.instructionCode = code;
  }

  getICode() {
    return this.instructionCode;
  }

  setInstruction(i) {
    this.instruction = i;
    return this.instruction;
  }

  getInstruction() {
    return this.instruction;
  }

  getRegValues() {
    return this.regValues;
  }

  setRegValues(values) {
    this.regValues = values;
  }

  getMemValue(address) {
    if (!this.memValues[address]) {
      this.updateMemValue(address, 0);
      updateMemories();
    }
    return this.memValues[address];
  }

  updateMemValue(address, value) {
    this.memValues[address] = value;
  }

  getMemValues() {
    return this.memValues;
  }

  getPcValue(key) {
    return this.pcValues[key];
  }

  updatePcValues(value) {
    this.pcValues[this.currAddress] = value;
  }

  getCurrAddress() {
    return this.currAddress;
  }

  setCurrAddress(values) {
    this.currAddress = values;
    return this.currAddress;
  }
}
