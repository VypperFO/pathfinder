interface Cell {
  row: number;
  col: number;
  wall: boolean;
}

export class RDMaze {
  private width: number;
  private height: number;
  private grid: Cell[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = [];

    // Initialize the grid with cells
    for (let row = 0; row < height; row++) {
      this.grid[row] = [];
      for (let col = 0; col < width; col++) {
        this.grid[row][col] = {
          row,
          col,
          wall: true,
        };
      }
    }
  }

  generate() {
    this.divide(0, 0, this.width - 1, this.height - 1);
    console.log(this.grid);
    this.paint();
  }

  private divide(x1: number, y1: number, x2: number, y2: number) {
    if (x2 - x1 < 2 || y2 - y1 < 2) {
      return; // Base case: cell too small to divide further
    }

    const horizontal = Math.random() < 0.5; // Randomly choose horizontal or vertical division
    const wallX = horizontal
      ? this.getRandomEvenNumber(x1 + 1, x2 - 1)
      : this.getRandomOddNumber(x1, x2);
    const wallY = horizontal
      ? this.getRandomOddNumber(y1, y2)
      : this.getRandomEvenNumber(y1 + 1, y2 - 1);

    // Create a passage in the wall at a random position
    const passageX = horizontal ? this.getRandomOddNumber(x1, x2) : wallX;
    const passageY = horizontal ? wallY : this.getRandomOddNumber(y1, y2);

    // Assign passage and wall values
    for (let row = y1; row <= y2; row++) {
      for (let col = x1; col <= x2; col++) {
        if (horizontal && row === passageY && col >= x1 && col <= x2) {
          this.grid[row][col].wall = false; // Assign passage for horizontal division
        } else if (!horizontal && col === passageX && row >= y1 && row <= y2) {
          this.grid[row][col].wall = false; // Assign passage for vertical division
        } else {
          this.grid[row][col].wall = true; // Assign wall
        }
      }
    }

    // Recursively divide the four resulting subareas
    this.divide(x1, y1, wallX - 1, wallY - 1);
    this.divide(wallX + 1, y1, x2, wallY - 1);
    this.divide(x1, wallY + 1, wallX - 1, y2);
    this.divide(wallX + 1, wallY + 1, x2, y2);
  }

  private getRandomEvenNumber(min: number, max: number) {
    return Math.floor((Math.random() * (max - min + 1)) / 2) * 2 + min;
  }

  private getRandomOddNumber(min: number, max: number) {
    return Math.floor((Math.random() * (max - min + 1)) / 2) * 2 + min + 1;
  }

  private paint() {
    console.log(this.grid);
    const cell = document.getElementsByClassName('cell');
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j].wall) {
          const index = i * this.grid[i].length + j;
          setTimeout(function () {
            cell[index].classList.remove('path');
            cell[index].classList.remove('unvisited');
            cell[index].classList.add('wall');
          }, 200);
        }
      }
    }
  }
}
