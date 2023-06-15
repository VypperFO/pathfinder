import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dijkstra } from '../scripts/algorithms/dijkstra';
import { AStar } from '../scripts/algorithms/astar';
import { BFS } from '../scripts/algorithms/bfs';
import { DFS } from '../scripts/algorithms/dfs';
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
  isStartCellSelected: boolean = false;
  isFinishCellSelected: boolean = false;
  startPoint = { row: 11, col: 40 };
  finishPoint = { row: 14, col: 80 };

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

  paint(event: MouseEvent, row: number, col: number) {
    const element = event.target as HTMLElement;
    if (element.classList.contains('start')) {
      this.isStartCellSelected = true;
      this.isFinishCellSelected = false;
    }
    if (element.classList.contains('finish')) {
      this.isStartCellSelected = false;
      this.isFinishCellSelected = true;
    }
    if (this.isPainting) {
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

  isStartCell(row: number, column: number) {
    return row === this.startPoint.row && column === this.startPoint.col;
  }

  isFinishCell(row: number, column: number) {
    return row === this.finishPoint.row && column === this.finishPoint.col;
  }

  moveCell(event: MouseEvent, row: number, col: number) {
    if (
      (this.isStartCellSelected || this.isFinishCellSelected) &&
      this.isPainting
    ) {
      const element = event.target as HTMLElement;
      if (
        element &&
        element.tagName === 'TD' &&
        !element.classList.contains('start') &&
        !element.classList.contains('finish')
      ) {
        element.classList.remove('path');
        element.classList.remove('wall');
        element.classList.add('unvisited');
      }
      if (this.isStartCellSelected) {
        this.startPoint = { row, col };
        console.log('start');
      } else if (this.isFinishCellSelected) {
        this.finishPoint = { row, col };
        console.log('finish');
      }
    }
  }

  stopPainting() {
    this.isPainting = false;
    this.isStartCellSelected = false;
    this.isFinishCellSelected = false;
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
    switch (type) {
      case 'dijkstra':
        this.dijkstra();
        break;
      case 'astar':
        this.astar();
        break;
      case 'bfs':
        this.bfs();
        break;
      default:
        break;
    }
  }

  dijkstra() {
    const grid = this.getGrid();
    const dijkstra = new Dijkstra(grid, this.startPoint, this.finishPoint);
    const shortestDijPath = dijkstra.findShortestPath();
    if (shortestDijPath[0] === -1) {
      console.log('no path found');
    } else {
      setTimeout((e: number) => {
        this.paintShortestPath(shortestDijPath);
      }, 500);
    }
  }

  astar() {
    const grid = this.getGrid();
    const astar = new AStar(
      grid,
      [this.startPoint.row, this.startPoint.col],
      [this.finishPoint.row, this.finishPoint.col]
    );
    const shortestAstarPath = astar.findPath();
    if (shortestAstarPath[0] === -1) {
      console.log('no path found');
    } else {
      setTimeout((e: number) => {
        this.paintShortestPath(shortestAstarPath);
      }, 500);
    }
  }

  bfs() {
    const grid = this.getGrid();
    const bfs = new BFS(grid);
    const shortestBFSPath = bfs.bfs(this.startPoint, this.finishPoint);
    if (shortestBFSPath[0] === -1) {
      console.log('no path found');
    } else {
      setTimeout((e: number) => {
        this.paintShortestPath(shortestBFSPath);
      }, 500);
    }
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
        setTimeout(paintNextCell, 50);
      }
    }

    paintNextCell();
  }

  /* placeStartFinishPoint() {
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
  }*/
}
