class AddressOrganizer {
  constructor() {
    this.currentPage = 0; // this is an index for elements
    this.elements = {};
    this.selectedAddress = "0x15C";
  }

  getSelectedAddress() {
    return this.selectedAddress;
  }

  setSelectedAddress(selectedAddress) {
    this.selectedAddress = selectedAddress;
    setTdValues(this.currentPage);
  }

  getElementsByPage(pageIndex) {
    return this.elements[pageIndex];
  }

  createRow(i) {
    let el = [];

    el.push(binToHex(dectoBin(i)));
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
      els.push(this.createRow(i));
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
