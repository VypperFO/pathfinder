export interface GridNode {
  row: number;
  col: number;
}

export class Dijkstra {
  private grid: number[][];
  private startNode: GridNode;
  private finishNode: GridNode;

  constructor(grid: number[][], startNode: GridNode, finishNode: GridNode) {
    startNode.row = startNode.row - 1;
    startNode.col = startNode.col - 1;
    finishNode.row = finishNode.row - 1;
    finishNode.col = finishNode.col - 1;
    this.grid = grid;
    this.startNode = startNode;
    this.finishNode = finishNode;
  }

  public findShortestPath(): number[] {
    const rows = this.grid.length;
    const cols = this.grid[0].length;

    const distances: number[][] = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(Infinity));

    distances[this.startNode.row][this.startNode.col] = 0;

    const queue: { node: GridNode; distance: number }[] = [
      { node: this.startNode, distance: 0 },
    ];

    const shortestPath: GridNode[] = [];

    while (queue.length > 0) {
      queue.sort((a, b) => a.distance - b.distance);

      const currentNode = queue.shift();

      if (!currentNode) {
        break;
      }

      this.paintVisited(currentNode.node.row, currentNode.node.col);

      if (
        currentNode.node.row === this.finishNode.row &&
        currentNode.node.col === this.finishNode.col
      ) {
        break;
      }

      const neighbors = this.getNeighbors(currentNode.node);

      for (const neighbor of neighbors) {
        const { row, col } = neighbor;

        const tentativeDistance =
          distances[currentNode.node.row][currentNode.node.col] + 1;

        if (tentativeDistance < distances[row][col]) {
          distances[row][col] = tentativeDistance;

          queue.push({ node: neighbor, distance: tentativeDistance });
        }
      }
    }

    let currentNode: GridNode = this.finishNode;

    while (
      currentNode.row !== this.startNode.row ||
      currentNode.col !== this.startNode.col
    ) {
      shortestPath.unshift(currentNode);
      const neighbors = this.getNeighbors(currentNode);

      for (const neighbor of neighbors) {
        const { row, col } = neighbor;

        if (
          distances[row][col] ===
          distances[currentNode.row][currentNode.col] - 1
        ) {
          currentNode = neighbor;
          break;
        }
      }
    }

    shortestPath.unshift(this.startNode);

    if (distances[this.finishNode.row][this.finishNode.col] === Infinity) {
      return [-1];
    }

    const shortestPathIndexes: number[] = shortestPath.map(
      (node) => node.row * cols + node.col
    );

    return shortestPathIndexes;
  }

  private getNeighbors(node: GridNode): GridNode[] {
    const { row, col } = node;
    const rows = this.grid.length;
    const cols = this.grid[0].length;
    const neighbors: GridNode[] = [];

    if (row > 0 && this.grid[row - 1][col] === 1) {
      neighbors.push({ row: row - 1, col });
    }

    if (row < rows - 1 && this.grid[row + 1][col] === 1) {
      neighbors.push({ row: row + 1, col });
    }

    if (col > 0 && this.grid[row][col - 1] === 1) {
      neighbors.push({ row, col: col - 1 });
    }

    if (col < cols - 1 && this.grid[row][col + 1] === 1) {
      neighbors.push({ row, col: col + 1 });
    }

    return neighbors;
  }

  private paintVisited(row: number, col: number) {
    const cell = document.getElementsByClassName('cell');
    const index = row * this.grid[0].length + col;
    if (
      !cell[index].classList.contains('start') &&
      !cell[index].classList.contains('finish')
    ) {
      setTimeout(function () {
        cell[index].classList.remove('path');
        cell[index].classList.remove('unvisited');
        cell[index].classList.add('visited');
      }, 300);
    }
  }
}
