class Organizer {
  constructor() {
    this.instruction = "add"; // for setting input
    this.regValues = Array(31).fill("0");
    this.memValues = [];
    this.valueTable = {};
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

  setValueTable(values) {
    this.valueTable = values;
  }

  getValueTable() {
    return this.valueTable;
  }
  updateValueTable(id, valueArr) {
    this.valueTable[id] = valueArr;
  }
}
