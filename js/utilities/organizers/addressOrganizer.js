class AddressOrganizer {
  constructor() {
    this.currentPage = 0; // this is an index for elements
    this.elements = {};
    this.selectedAddress = "0x0";
  }

  updateToAddressBook(machineCode, meaning) {
    this.elements[this.currentPage][this.selectedAddress] = [
      machineCode,
      meaning,
    ];
    console.log(this.elements);
    setTdValues(this.currentPage);
  }

  getSelectedAddress() {
    return this.selectedAddress;
  }

  setSelectedAddress(selectedAddress) {
    getElementByAttribute("address", this.selectedAddress)?.children.forEach(
      (el) => {
        el.classList.remove("bg-green-200");
      }
    );

    this.selectedAddress = selectedAddress;
    getElementByAttribute("address", this.selectedAddress)?.children.forEach(
      (el) => {
        el.classList.add("bg-green-200");
      }
    );
  }

  getElementsByPage(pageIndex) {
    return this.elements[pageIndex];
  }

  createRow() {
    let el = [];

    el.push("000000 00000 00000 00000 00000 000000");
    el.push("Nothing");

    let b = document.createElement("button");
    b.classList.add("bg-rose-500", "p-2", "rounded", "text-white", "m-3");
    b.append(document.createTextNode("Clear"));

    el.push(b);

    return el;
  }

  initElements() {
    let els = [];

    for (
      let i = this.currentPage * 100;
      i < (this.currentPage + 1) * 100;
      i += 4
    ) {
      els[binToHex(dectoBin(i))] = this.createRow(i);
    }
    this.elements[this.currentPage] = els;
    setTdValues(this.currentPage);
  }

  incrementCurrentPage() {
    this.currentPage += 1;
    this.updatePageCounter();
    if (this.elements.hasOwnProperty(this.currentPage)) {
      setTdValues(this.currentPage);
      return;
    }
    this.initElements();
  }

  decrementCurrentPage() {
    this.currentPage = Math.max(this.currentPage - 1, 0);
    setTdValues(this.currentPage);
    this.updatePageCounter();
  }

  updatePageCounter() {
    pageCounterSpan.innerText = this.currentPage;
  }

  getCurrentPage() {
    return this.currentPage;
  }
}
