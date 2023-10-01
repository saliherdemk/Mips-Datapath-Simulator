class AddressOrganizer {
  constructor() {
    this.currentPage = 0; // this is an index for elements
    this.elements = {};
    this.selectedAddress = null;
  }

  updateToAddressBook(machineCode, meaning, address = this.selectedAddress) {
    if (!address) {
      selectedAddressContainer.classList.add("jump-shaking");

      return;
    }
    this.elements[this.currentPage][address][0] = machineCode;
    this.elements[this.currentPage][address][1] = meaning;

    let rows = getElementByAttribute("address", address).children;
    rows[1].innerText = machineCode;
    rows[2].innerText = meaning;
  }

  getSelectedAddress() {
    return this.selectedAddress;
  }

  resetSelectedAddress() {
    getElementByAttribute("address", this.selectedAddress)?.children.forEach(
      (el) => {
        el.classList.remove("bg-green-200");
      }
    );
    this.selectedAddress = null;
    selectedAddressContainer.innerText = "None";
  }

  toggleSelectedAddress(selectedAddress) {
    if (this.selectedAddress == selectedAddress) {
      this.resetSelectedAddress();
      return;
    }
    this.resetSelectedAddress();
    this.selectedAddress = selectedAddress;
    getElementByAttribute("address", this.selectedAddress)?.children.forEach(
      (el) => {
        el.classList.add("bg-green-200");
      }
    );
    selectedAddressContainer.innerText = this.selectedAddress;
  }

  getElementsByPage(pageIndex) {
    return this.elements[pageIndex];
  }

  createRow(address) {
    let el = [];

    el.push("000000 00000 00000 00000 00000 000000");
    el.push("Nothing");

    let b = document.createElement("button");
    b.classList.add("bg-rose-500", "p-2", "rounded", "text-white", "m-3");
    b.append(document.createTextNode("Clear"));
    b.onclick = (e) => {
      e.stopPropagation();
      this.updateToAddressBook(
        "000000 00000 00000 00000 00000 000000",
        "Nothing",
        address
      );
    };

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
      let address = binToHex(dectoBin(i));
      els[address] = this.createRow(address);
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
