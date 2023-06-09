class AStar {
  Astar(openNodes, closedNodes) {
    this.openNodes = openNodes; // the set of nodes to be evaluated
    this.closedNodes = closedNodes; // the set of nodes already evaluated
  }

  findPath() {}
}

class Node {
  Node() {
    let GCost; // distance from starting node
    let HCost; // distance from end node
    let FCost; // gcost + hcost
  }
}
