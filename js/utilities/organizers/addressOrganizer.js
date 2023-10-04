class AddressOrganizer {
  constructor() {
    this.currentPage = 0; // this is an index for book
    this.book = {};
    this.selectedAddress = null;
    this.currentAddress = "0x00000000";
  }

  setTdValues(pageIndex) {
    const trs = document.querySelectorAll("tr");
    const els = addressOrganizer.getElementsByPage(pageIndex);
    let i = 1;
    for (const [key, value] of Object.entries(els)) {
      let tds = trs[i].children;
      [0, 1, 2, 3].forEach((index) => {
        key == addressOrganizer.getSelectedAddress()
          ? tds[index].classList.add("bg-green-200")
          : tds[index].classList.remove("bg-green-200");

        key == addressOrganizer.getCurrentAddress()
          ? tds[index].classList.add("bg-blue-200")
          : tds[index].classList.remove("bg-blue-200");

        if (!index) tds[index].innerText = key;
        else if (index == 3) {
          tds[index].innerHTML = "";
          tds[index].appendChild(value[index - 1]);
        } else {
          tds[index].innerText = value[index - 1];
        }
      });

      trs[i].setAttribute("address", key);
      i += 1;
    }
  }

  // Current Address

  getCurrentAddress() {
    return this.currentAddress;
  }
  getAddressValue(address) {
    return this.book[~~(binToDec(address) / 100)][binToHex(address)][0];
  }

  // Paint updated current address from book
  updateCurrentAddress(address) {
    let oldEl = getElementByAttribute("address", this.currentAddress);
    removeClassFromChildren(oldEl, "bg-blue-200");

    this.currentAddress = binToHex(address);

    let page = ~~(binToDec(address) / 100);
    if (page > Object.values(this.book).length - 1) {
      this.initElements(page);
      this.jumpToPage(page);
    }

    let newEl = getElementByAttribute("address", this.currentAddress);
    addClassToChildren(newEl, "bg-blue-200");
  }

  // Selected Address
  getSelectedAddress() {
    return this.selectedAddress;
  }

  resetSelectedAddress() {
    let oldEl = getElementByAttribute("address", this.selectedAddress);
    removeClassFromChildren(oldEl, "bg-green-200");

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

    let newEl = getElementByAttribute("address", this.selectedAddress);
    addClassToChildren(newEl, "bg-green-200");

    selectedAddressContainer.innerText = this.selectedAddress;
  }

  // Creating records for that page if not exists
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

  initElements(page = this.currentPage) {
    let els = [];

    for (let i = page * 100; i < (page + 1) * 100; i += 4) {
      let address = binToHex(dectoBin(i, 32));
      els[address] = this.createRow(address);
    }
    this.book[page] = els;
    this.setTdValues(page);
  }

  // Page logic
  incrementCurrentPage() {
    this.currentPage += 1;
    this.updatePageCounter();
    if (this.book.hasOwnProperty(this.currentPage)) {
      this.setTdValues(this.currentPage);
      return;
    }
    this.initElements();
  }

  decrementCurrentPage() {
    this.currentPage = Math.max(this.currentPage - 1, 0);
    this.updatePageCounter();

    if (this.book.hasOwnProperty(this.currentPage)) {
      this.setTdValues(this.currentPage);
      return;
    }
    this.initElements();
  }

  jumpToPage(pageNumber) {
    this.currentPage = pageNumber;
    this.setTdValues(pageNumber);
    this.updatePageCounter();
  }

  updatePageCounter() {
    pageCounterSpan.innerText = this.currentPage;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getElementsByPage(pageIndex) {
    return this.book[pageIndex];
  }

  // Adding & removing records to book
  updateToAddressBook(machineCode, meaning, address = this.selectedAddress) {
    if (!address) {
      selectedAddressContainer.classList.add("jump-shaking");
      return;
    }
    this.book[this.currentPage][address][0] = machineCode;
    this.book[this.currentPage][address][1] = meaning;

    let rows = getElementByAttribute("address", address).children;
    rows[1].innerText = machineCode;
    rows[2].innerText = meaning;
  }
}
