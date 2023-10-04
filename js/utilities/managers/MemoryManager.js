class MemoryManager {
  updateMemories() {
    let tempContainer = document.createElement("div");
    let memValues = organizer.getMemValues();
    for (const [key, value] of Object.entries(memValues)) {
      let con = document.createElement("div");
      con.classList.add("flex");
      let child1 = document.createElement("div");
      child1.classList.add("border-2", "border-gray-500", "border-r-0", "p-3");
      child1.innerText = key;
      let child2 = document.createElement("div");
      child2.classList.add("border-2", "border-gray-500", "p-3");
      child2.innerText = value;
      con.append(child1, child2);
      tempContainer.append(con);
    }
    memContainer.innerHTML = tempContainer.innerHTML;
  }
}
