export class AStar {
  private grid: number[][];
  private startNode: [number, number];
  private finishNode: [number, number];
  private openSet: [number, number][];
  private closedSet: [number, number][];
  private cameFrom: Map<string, [number, number]>;
  private gScore: Map<string, number>;
  private fScore: Map<string, number>;

  constructor(
    grid: number[][],
    startNode: [number, number],
    finishNode: [number, number]
  ) {
    this.grid = grid;
    this.startNode = startNode;
    this.finishNode = finishNode;
    this.openSet = [startNode];
    this.closedSet = [];
    this.cameFrom = new Map<string, [number, number]>();
    this.gScore = new Map<string, number>();
    this.gScore.set(this.keyToString(startNode), 0);
    this.fScore = new Map<string, number>();
    this.fScore.set(this.keyToString(startNode), this.heuristic(startNode));
  }

  public findPath(): number[] {
    while (this.openSet.length > 0) {
      const current = this.lowestFScoreNode();
      if (
        current[0] === this.finishNode[0] &&
        current[1] === this.finishNode[1]
      ) {
        return this.reconstructPath(current);
      }

      this.removeFromOpenSet(current);
      this.closedSet.push(current);
      this.paintVisited(current[0], current[1]);

      const neighbors = this.getNeighbors(current);
      for (const neighbor of neighbors) {
        if (
          this.closedSet.find(
            (node) => node[0] === neighbor[0] && node[1] === neighbor[1]
          )
        ) {
          continue;
        }

        const tentativeGScore = this.gScore.get(this.keyToString(current))! + 1;
        if (
          !this.openSet.find(
            (node) => node[0] === neighbor[0] && node[1] === neighbor[1]
          )
        ) {
          this.openSet.push(neighbor);
        } else if (
          tentativeGScore >= this.gScore.get(this.keyToString(neighbor))!
        ) {
          continue;
        }

        this.cameFrom.set(this.keyToString(neighbor), current);
        this.gScore.set(this.keyToString(neighbor), tentativeGScore);
        this.fScore.set(
          this.keyToString(neighbor),
          tentativeGScore + this.heuristic(neighbor)
        );
      }
    }

    return [-1];
  }

  private lowestFScoreNode(): [number, number] {
    let lowestNode = this.openSet[0];
    let lowestFScore = this.fScore.get(this.keyToString(lowestNode))!;

    for (const node of this.openSet) {
      const fScore = this.fScore.get(this.keyToString(node));
      if (fScore !== undefined && fScore < lowestFScore) {
        lowestNode = node;
        lowestFScore = fScore;
      }
    }

    return lowestNode;
  }

  private removeFromOpenSet(node: [number, number]): void {
    const index = this.openSet.findIndex(
      (n) => n[0] === node[0] && n[1] === node[1]
    );
    this.openSet.splice(index, 1);
  }

  private getNeighbors(node: [number, number]): [number, number][] {
    const [x, y] = node;
    const neighbors: [number, number][] = [];

    if (x > 0 && this.grid[x - 1][y] === 1) {
      neighbors.push([x - 1, y]);
    }
    if (x < this.grid.length - 1 && this.grid[x + 1][y] === 1) {
      neighbors.push([x + 1, y]);
    }
    if (y > 0 && this.grid[x][y - 1] === 1) {
      neighbors.push([x, y - 1]);
    }
    if (y < this.grid[0].length - 1 && this.grid[x][y + 1] === 1) {
      neighbors.push([x, y + 1]);
    }

    return neighbors;
  }

  private reconstructPath(current: [number, number]): number[] {
    const path = [current];

    while (this.cameFrom.has(this.keyToString(current))) {
      current = this.cameFrom.get(this.keyToString(current))!;
      path.unshift(current);
    }

    return path.map((node) => node[0] * this.grid[0].length + node[1]);
  }

  private heuristic(node: [number, number]): number {
    const dx = Math.abs(node[0] - this.finishNode[0]);
    const dy = Math.abs(node[1] - this.finishNode[1]);
    return dx + dy;
  }

  private keyToString(node: [number, number]): string {
    return node[0] + ',' + node[1];
  }

  private paintVisited(row: number, col: number) {
    const cell = document.getElementsByClassName('cell');
    const index = row * this.grid[0].length + col;
    setTimeout(function () {
      if (
        !cell[index].classList.contains('start') &&
        !cell[index].classList.contains('finish')
      ) {
        cell[index].classList.remove('path');
        cell[index].classList.remove('unvisited');
        cell[index].classList.add('visited');
      }
    }, 500);
  }
}
