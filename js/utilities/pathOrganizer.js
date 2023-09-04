class PathOrganizer {
  constructor() {
    this.components = [];
    this.wires = [];
    this.points = [];
    this.nodes = [];
    this.pc;
    this.register;
  }
  // Components
  setComponents(components) {
    this.components = components;
  }

  getComponents() {
    return this.components;
  }

  // Wires
  setWires() {
    let components = this.components;
    components.forEach((component) => {
      let componentWires = component?.output
        ? component.output.wires
        : component.outputs.reduce(function (a, b) {
            return a.concat(b.wires);
          }, []);
      component.setWires(componentWires);
      this.wires = [...this.wires, ...componentWires];
    });
  }

  findWiresByEndNodeId(nodeId) {
    return this.wires.find((wire) => wire.endNode.id == nodeId);
  }

  // Points
  setPoints(points) {
    this.points = points;
  }

  // Nodes
  setNodes(nodes) {
    this.nodes = nodes;
  }

  addNodes(nodes) {
    nodes.forEach((node) => {
      this.nodes.push(node);
    });
  }

  getNodes() {
    return this.nodes;
  }

  openPopups() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].openPopup();
    }
  }

  closePopups() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].closePopup();
    }
  }

  findNodeById(id) {
    return this.nodes.find((node) => node.id == id);
  }

  // PC
  setPc(comp) {
    this.pc = comp;
    return this.pc;
  }

  // Register
  setRegister(comp) {
    this.register = comp;
    return this.register;
  }

  getRegister() {
    return this.register;
  }

  resetDataPath() {
    this.nodes.map((n) => {
      n.setDontCare(false);
    });
  }

  onPress() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].onClick();
    }
  }

  draw() {
    noFill();
    for (let i = 0; i < this.wires.length; i++) {
      this.wires[i].draw();
    }
    fill(colors.WHITE);

    for (let i = 0; i < this.components.length; i++) {
      this.components[i].draw();
    }

    for (let i = 0; i < this.points.length; i++) {
      this.points[i].draw();
    }

    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].draw();
    }
  }
}
