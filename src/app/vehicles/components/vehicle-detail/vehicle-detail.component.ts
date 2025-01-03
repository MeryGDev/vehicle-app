import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { loadVehicleModels, loadVehicleTypes, resetVehicleData } from '../../../store/actions';
import { MaterialModule } from '../../../shared/material.module';
import { VehicleType } from '../../models/vehicle-type.model';
import { VehicleModel } from '../../models/vehicle-model.model';
import {
  selectError,
  selectLoadingTypes,
  selectLoadingModels,
  selectVehicleModels,
  selectVehicleTypes,
} from '../../../store/selectors';

import { VehicleTypesComponent } from '../vehicle-types/vehicle-types.component'; // Importa el componente de tipos
import { VehicleModelsComponent } from '../vehicle-models/vehicle-models.component';

@Component({
  selector: 'app-vehicle-detail',
  imports: [CommonModule, MaterialModule, VehicleTypesComponent, VehicleModelsComponent],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss',
})
export class VehicleDetailComponent {
  make: string = '';
  models$: Observable<VehicleModel[]> = new Observable();
  vehicleTypes$: Observable<VehicleType[]> = new Observable();
  error$: Observable<string | null> = new Observable();
  loadingModels$: Observable<boolean> = new Observable();
  loadingTypes$: Observable<boolean> = new Observable();
  selectedVehicleType: string | null = null;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.make = decodeURIComponent(params['id']);
      this.resetData();
      this.loadVehicleDetails();
    });

    this.models$ = this.store.pipe(
      select(selectVehicleModels),
      map((models) => models ?? [])
    );

    this.vehicleTypes$ = this.store.pipe(
      select(selectVehicleTypes),
      map((types) => types ?? [])
    );

    this.loadingModels$ = this.store.pipe(select(selectLoadingModels));
    this.loadingTypes$ = this.store.pipe(select(selectLoadingTypes));
    this.error$ = this.store.pipe(select(selectError));
  }

  resetData(): void {
    this.store.dispatch(resetVehicleData());
  }

  loadVehicleDetails(): void {
    this.store.dispatch(loadVehicleModels({ make: this.make }));
    this.store.dispatch(loadVehicleTypes({ make: this.make }));
  }

  onTypeSelect(typeName: string): void {
    this.selectedVehicleType = typeName;
    this.store.dispatch(loadVehicleModels({ make: typeName }));
  }
}
