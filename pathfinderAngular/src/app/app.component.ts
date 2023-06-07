import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { GridTableComponent } from './grid-table/grid-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(GridTableComponent) gridTableComponent!: GridTableComponent;
  
  ngAfterViewInit() {
    // no specific code is needed
  }

  clearBoard(){
    this.gridTableComponent.clearCells();
  }  
}
