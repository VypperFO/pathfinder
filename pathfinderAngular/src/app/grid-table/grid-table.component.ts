import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dijkstra } from '../scripts/algorithms/dijkstra';
import { RDMaze } from '../scripts/mazes/RDMaze';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class GridTableComponent implements OnInit {
  columns: number[] = [];
  rows: number[] = [];
  nbColumns = 100;
  nbRow = 28;
  isPainting: boolean = false;
  isAlgorithmsDone: boolean = false;

  ngOnInit() {
    this.columns = Array.from(
      { length: this.nbColumns },
      (_, index) => index + 1
    );
    this.rows = Array.from({ length: this.nbRow }, (_, index) => index + 1);
  }

  startPainting() {
    this.isPainting = true;
  }

  paint(event: MouseEvent) {
    if (this.isPainting) {
      const element = event.target as HTMLElement;
      if (element && element.tagName === 'TD') {
        element.classList.remove('path');
        element.classList.remove('unvisited');
        element.classList.add('wall');
      }
    }
  }

  stopPainting() {
    this.isPainting = false;
  }

  maze() {
    const maze = new RDMaze(this.nbColumns, this.nbRow);
    maze.generate();
  }

  algorithms(/*type: string*/) {
    // Algorithms
    const grid = this.getGrid();
    const startNode = { row: 11, col: 40 };
    const finishNode = { row: 0, col: 40 };

    const dijkstra = new Dijkstra(grid, startNode, finishNode);
    const shortestPath = dijkstra.findShortestPath();
    setTimeout((e: number) => {
      this.paintShortestPath(shortestPath);
    }, 500);
    this.isAlgorithmsDone = true;

    /*
    switch (type) {
      case 'dijkstra':
        

        break;
      default:
        break;
    }*/
  }

  getGrid() {
    const grid = document.getElementsByClassName('cell');
    const rows = this.nbRow;
    const cols = this.nbColumns;

    const gridArray = Array.from({ length: rows }, () => Array(cols).fill(1));

    for (let i = 0; i < grid.length; i++) {
      const element = grid[i];
      const className = element.className;
      const rowIndex = Math.floor(i / cols);
      const colIndex = i % cols;

      if (className.includes('wall')) {
        gridArray[rowIndex][colIndex] = 0;
      }
    }

    return gridArray;
  }

  paintShortestPath(shortestPath: number[]) {
    const paintedCells = document.getElementsByClassName('cell');

    let index = 0;
    function paintNextCell() {
      if (index < shortestPath.length) {
        paintedCells[shortestPath[index]].classList.remove('unvisited');
        paintedCells[shortestPath[index]].classList.remove('visited');
        paintedCells[shortestPath[index]].classList.add('path');

        index++;
        setTimeout(paintNextCell, 50); // Delay of 1 second (1000 milliseconds)
      }
    }

    paintNextCell();
  }
}
