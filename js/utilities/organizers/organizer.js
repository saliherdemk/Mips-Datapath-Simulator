class Organizer {
  constructor() {
    this.isAutomatedState = false;
    this.automationSpeed = 1000;
    this.regValues = Array(31).fill("0");
    this.memValues = [];
    this.valueTable = {};
  }

  setAutomationSpeed(ms) {
    this.automationSpeed = ms;
  }

  getAutomationSpeed() {
    return this.automationSpeed;
  }

  isAutometed() {
    return this.isAutomatedState;
  }

  toggleIsAutometed() {
    this.isAutomatedState = !this.isAutomatedState;
    speedInput.disabled = this.isAutomatedState;
    return this.isAutomatedState;
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
