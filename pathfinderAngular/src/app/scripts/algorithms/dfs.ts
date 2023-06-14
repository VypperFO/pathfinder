type Point = {
  row: number;
  col: number;
};

export class DFS {
  private grid: number[][];
  private numRows: number;
  private numCols: number;
  private visited: boolean[][];
  private shortestPath: Point[] | null;

  constructor(grid: number[][]) {
    this.grid = grid;
    this.numRows = grid.length;
    this.numCols = grid[0].length;
    this.visited = Array.from({ length: this.numRows }, () =>
      Array(this.numCols).fill(false)
    );
    this.shortestPath = null;
  }

  private isValid(row: number, col: number): boolean {
    return row >= 0 && row < this.numRows && col >= 0 && col < this.numCols;
  }

  private dfsUtil(point: Point, finish: Point, path: Point[]): void {
    const { row, col } = point;

    if (row === finish.row && col === finish.col) {
      if (
        this.shortestPath === null ||
        path.length < this.shortestPath.length
      ) {
        this.shortestPath = [...path];
      }
      return;
    }

    this.visited[row][col] = true;

    const directions: Point[] = [
      { row: -1, col: 0 }, // up
      { row: 1, col: 0 }, // down
      { row: 0, col: -1 }, // left
      { row: 0, col: 1 }, // right
    ];

    for (const direction of directions) {
      const newRow = row + direction.row;
      const newCol = col + direction.col;

      if (
        this.isValid(newRow, newCol) &&
        this.grid[newRow][newCol] !== 0 &&
        !this.visited[newRow][newCol]
      ) {
        path.push({ row: newRow, col: newCol });
        this.dfsUtil({ row: newRow, col: newCol }, finish, path);
        path.pop();
      }
    }

    this.visited[row][col] = false;
  }

  public dfs(start: Point, finish: Point): number[] | null {
    this.shortestPath = null;
    this.dfsUtil(start, finish, [start]);

    if (this.shortestPath === null) {
      return null;
    }

    return [-1];
    /*    return this.shortestPath.map(
      (point: Point) => point.row * this.numCols + point.col
    );*/
  }
}
