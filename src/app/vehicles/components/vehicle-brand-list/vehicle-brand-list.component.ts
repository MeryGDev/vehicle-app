import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MaterialModule } from '../../../shared/material.module';
import { filterVehicleBrands, loadVehicleBrands } from '../../../store/actions';
import { selectFilteredVehicleBrands, selectError, selectLoadingBrands } from '../../../store/selectors';

import { SearchComponent } from '../search/search.component';
import { VehicleBrand } from '../../models/vehicle-brand.model';

@Component({
  selector: 'app-vehicle-brand-list',
  imports: [CommonModule, MaterialModule, ScrollingModule, FormsModule, SearchComponent],
  templateUrl: './vehicle-brand-list.component.html',
  styleUrl: './vehicle-brand-list.component.scss',
})
export class VehicleBrandListComponent implements OnInit {
  // State properties
  brands$: Observable<VehicleBrand[]> = new Observable();
  rows$: Observable<VehicleBrand[][]> = new Observable();
  loadingBrands$: Observable<boolean> = new Observable();
  error$: Observable<string | null> = new Observable();
  searchQuery: string = '';

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscríbete a los selectores del store para obtener los valores actualizados
    this.brands$ = this.store.pipe(select(selectFilteredVehicleBrands));
    this.loadingBrands$ = this.store.pipe(select(selectLoadingBrands));
    this.error$ = this.store.pipe(select(selectError));

    this.rows$ = this.brands$.pipe(
      map((brands) => {
        if (!brands || brands.length === 0) return [];
        const rows = [];
        for (let i = 0; i < brands.length; i += 4) {
          rows.push(brands.slice(i, i + 4)); // Divide brands into rows of 4
        }
        return rows;
      })
    );

    // Dispatch the action to load brands
    this.store.dispatch(loadVehicleBrands());
  }

  onSearchChanged(searchQuery: string): void {
    this.store.dispatch(filterVehicleBrands({ searchQuery }));
  }

  viewDetails(brand: string): void {
    this.router.navigate(['/vehicle', brand]);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }
}
