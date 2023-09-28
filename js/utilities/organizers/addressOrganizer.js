class AddressOrganizer {
  constructor() {
    this.currentPage = 0; // this is an index for elements
    this.elements = []; // array of (arrays of elements)
  }

  getElements() {
    return this.elements;
  }

  createRow(i) {
    let el = [];

    el.push(binToHex(dectoBin(i + 344)));
    el.push("000000 00000 00000 00000 00000 000000");
    el.push("Nothing");

    let a = document.createElement("input");
    a.type = "radio";
    a.value = false;
    let b = document.createElement("button");
    b.classList.add("bg-rose-500", "p-2", "rounded", "text-white", "m-3");
    b.append(document.createTextNode("Clear"));

    el.push(a);
    el.push(b);

    return el;
  }

  initElements() {
    for (let i = 0; i < 400; i += 4) {
      this.elements.push(this.createRow(i));
    }
    setTdValues();
  }

  incrementCurrentPage() {
    this.currentPage += 1;
  }

  decrementCurrentPage() {
    this.currentPage = Max(this.currentPage - 1, 0);
  }

  getCurrentPage() {
    return this.currentPage;
  }
}
