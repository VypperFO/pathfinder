import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dijkstra } from '../scripts/algorithms/dijkstra';
import { AStar } from '../scripts/algorithms/astar';
import { RDMaze } from '../scripts/mazes/RDMaze';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class GridTableComponent implements OnInit, AfterViewInit {
  columns: number[] = [];
  rows: number[] = [];
  nbColumns = 100;
  nbRow = 28;
  isPainting: boolean = false;
  isAlgorithmsDone: boolean = false;
  startPoint = { row: 11, col: 40 };
  finishPoint = { row: 14, col: 80 };
  grid = this.getGrid();

  ngOnInit() {
    this.columns = Array.from(
      { length: this.nbColumns },
      (_, index) => index + 1
    );
    this.rows = Array.from({ length: this.nbRow }, (_, index) => index + 1);
  }

  ngAfterViewInit(): void {
    this.placeStartFinishPoint();
  }

  startPainting() {
    this.isPainting = true;
  }

  paint(event: MouseEvent) {
    if (this.isPainting) {
      const element = event.target as HTMLElement;
      if (
        element &&
        element.tagName === 'TD' &&
        !element.classList.contains('start') &&
        !element.classList.contains('finish')
      ) {
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
    this.clearBoard();
    const maze = new RDMaze(this.nbColumns, this.nbRow);
    maze.generate();
  }

  clearBoard() {
    const cells = document.getElementsByClassName('cell');
    for (let index = 0; index < cells.length; index++) {
      cells[index].classList.remove('wall');
      cells[index].classList.remove('path');
      cells[index].classList.remove('visited');
      cells[index].classList.add('unvisited');
    }
  }

  clearPath() {
    const path = document.getElementsByClassName('path');
    for (let index = 0; index < path.length; index++) {
      path[index].classList.remove('path');
      path[index--].classList.add('unvisited');
    }
  }

  algorithms(type: string) {
    //const type: string = 'astar';
    switch (type) {
      case 'dijkstra':
        this.dijkstra();
        break;
      case 'astar':
        this.astar();
        break;
      default:
        break;
    }
    this.isAlgorithmsDone = true;
  }

  dijkstra() {
    const dijkstra = new Dijkstra(this.grid, this.startPoint, this.finishPoint);
    const shortestDijPath = dijkstra.findShortestPath();
    setTimeout((e: number) => {
      this.paintShortestPath(shortestDijPath);
    }, 500);
  }

  astar() {
    const astar = new AStar(
      this.grid,
      [this.startPoint.row, this.startPoint.col],
      [this.finishPoint.row, this.finishPoint.col]
    );
    const shortestAstarPath = astar.findPath();
    setTimeout((e: number) => {
      this.paintShortestPath(shortestAstarPath);
    }, 500);
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
      const paintIndex = paintedCells[shortestPath[index]];
      if (index < shortestPath.length) {
        paintIndex.classList.remove('unvisited');
        paintIndex.classList.remove('visited');
        paintIndex.classList.add('path');

        index++;
        setTimeout(paintNextCell, 50); // Delay of 1 second
      }
    }

    paintNextCell();
  }

  placeStartFinishPoint() {
    this.placeStartPoint();
    this.placeFinishPoint();
  }

  placeStartPoint() {
    const startingCell = document.getElementById(
      this.startPoint.row + '-' + this.startPoint.col
    );
    startingCell?.classList.remove('unvisited');
    startingCell?.classList.add('start');
  }

  placeFinishPoint() {
    const finishingCell = document.getElementById(
      this.finishPoint.row + '-' + this.finishPoint.col
    );
    finishingCell?.classList.remove('unvisited');
    finishingCell?.classList.add('finish');
  }
}
