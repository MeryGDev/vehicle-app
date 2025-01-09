import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MaterialModule } from '../../../shared/material.module';
import { filterVehicleMakes, loadVehicleMakes } from '../../../store/actions';
import { selectFilteredVehicleMakes, selectError, selectLoadingMakes } from '../../../store/selectors';

import { SearchComponent } from '../search/search.component';
import { VehicleMake } from '../../models/vehicle-make.model';

@Component({
  selector: 'app-vehicle-make-list',
  imports: [CommonModule, MaterialModule, ScrollingModule, FormsModule, SearchComponent],
  templateUrl: './vehicle-make-list.component.html',
  styleUrl: './vehicle-make-list.component.scss',
})
export class VehicleMakeListComponent implements OnInit {
  // State properties
  makes$: Observable<VehicleMake[]> = new Observable();
  rows$: Observable<VehicleMake[][]> = new Observable();
  loadingMakes$: Observable<boolean> = new Observable();
  error$: Observable<string | null> = new Observable();
  searchQuery: string = '';

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to store selectors to get updated values
    this.makes$ = this.store.pipe(select(selectFilteredVehicleMakes));
    this.loadingMakes$ = this.store.pipe(select(selectLoadingMakes));
    this.error$ = this.store.pipe(select(selectError));

    this.rows$ = this.makes$.pipe(
      map((makes) => {
        if (!makes || makes.length === 0) return [];
        const rows = [];
        for (let i = 0; i < makes.length; i += 4) {
          rows.push(makes.slice(i, i + 4)); // Divide makes into rows of 4
        }
        return rows;
      })
    );

    // Dispatch the action to load makes
    this.store.dispatch(loadVehicleMakes());
  }

  onSearchChanged(searchQuery: string): void {
    this.store.dispatch(filterVehicleMakes({ searchQuery }));
  }

  viewDetails(make: string): void {
    this.router.navigate(['/vehicle', make]);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }
}
