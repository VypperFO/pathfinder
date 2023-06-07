import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridTableComponent } from '../grid-table/grid-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GridTableComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 
}
