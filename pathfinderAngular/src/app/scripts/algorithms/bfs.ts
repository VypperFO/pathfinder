type Point = {
  row: number;
  col: number;
};

type QueueNode = {
  point: Point;
  distance: number;
};

export class BFS {
  private grid: number[][];
  private numRows: number;
  private numCols: number;

  constructor(grid: number[][]) {
    this.grid = grid;
    this.numRows = grid.length;
    this.numCols = grid[0].length;
  }

  private isValid(row: number, col: number): boolean {
    return row >= 0 && row < this.numRows && col >= 0 && col < this.numCols;
  }

  public bfs(start: Point, finish: Point): number[] {
    start.row = start.row - 1;
    start.col = start.col - 1;
    finish.row = finish.row - 1;
    finish.col = finish.col - 1;

    const visited: boolean[][] = Array.from({ length: this.numRows }, () =>
      Array(this.numCols).fill(false)
    );

    const parents: Point[][] = Array.from({ length: this.numRows }, () =>
      Array(this.numCols).fill(null)
    );

    const queue: QueueNode[] = [];
    queue.push({ point: start, distance: 0 });
    visited[start.row][start.col] = true;

    const directions: Point[] = [
      { row: -1, col: 0 }, // up
      { row: 1, col: 0 }, // down
      { row: 0, col: -1 }, // left
      { row: 0, col: 1 }, // right
    ];

    while (queue.length > 0) {
      const current = queue.shift();
      if (current) {
        const { point, distance } = current;

        if (point.row === finish.row && point.col === finish.col) {
          const shortestPath: number[] = [];
          let currentPoint: Point | null = point;

          while (currentPoint) {
            shortestPath.unshift(
              currentPoint.row * this.numCols + currentPoint.col
            );
            currentPoint = parents[currentPoint.row][currentPoint.col];
          }

          return shortestPath;
        }

        for (const direction of directions) {
          const newRow = point.row + direction.row;
          const newCol = point.col + direction.col;

          if (
            this.isValid(newRow, newCol) &&
            this.grid[newRow][newCol] !== 0 &&
            !visited[newRow][newCol]
          ) {
            queue.push({
              point: { row: newRow, col: newCol },
              distance: distance + 1,
            });
            visited[newRow][newCol] = true;
            parents[newRow][newCol] = point;
            this.paintVisited(newRow, newCol);
          }
        }
      }
    }

    return [-1]; // couldn't reach the finish point
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
