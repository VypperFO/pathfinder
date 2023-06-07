import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.css'],
  imports: [CommonModule],
  standalone:true
})
export class GridTableComponent implements OnInit {
  columns: number[] = [];
  rows: number[] = [];
  isPainting: boolean = false;

  ngOnInit() {
    this.columns = Array.from({ length: 100 }, (_, index) => index + 1);
    this.rows = Array.from({ length: 28 }, (_, index) => index + 1);
  }

 startPainting() {
    this.isPainting = true;
  }

  paint(event: MouseEvent) {
    if (this.isPainting) {
      const element = event.target as HTMLElement;
      if (element && element.tagName === 'TD') {
        element.classList.add('wall');
      }
    }
  }

  stopPainting() {
    this.isPainting = false;
  }

  clearCells(){
    const paintedCells = document.getElementsByClassName('wall');
    while (paintedCells.length) {
      paintedCells[0].classList.remove('wall');
    }
  }
}
