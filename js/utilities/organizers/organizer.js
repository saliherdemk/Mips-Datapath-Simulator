class Organizer {
  constructor() {
    this.isAutomatedState = false;
    this.regValues = Array(31).fill("0");
    this.memValues = [];
    this.valueTable = {};
  }

  isAutometed() {
    return this.isAutomatedState;
  }

  toggleIsAutometed() {
    this.isAutomatedState = !this.isAutomatedState;
    return this.isAutomatedState;
  }

  enableAutomation() {
    this.isAutomatedState = true;
  }

  disableAutomation() {
    this.isAutomatedState = false;
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
      memoryManager.updateMemories();
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
