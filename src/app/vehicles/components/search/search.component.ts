import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-search',
  imports: [FormsModule, MaterialModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  searchQuery: string = '';

  onSearchChange(): void {
    this.searchChanged.emit(this.searchQuery);
  }
}
