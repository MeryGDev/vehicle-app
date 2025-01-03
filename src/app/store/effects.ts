import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { VehicleService } from '../vehicles/services/vehicle.service';
import {
  loadVehicleBrands,
  loadVehicleBrandsSuccess,
  loadVehicleBrandsFailure,
  loadVehicleModels,
  loadVehicleModelsSuccess,
  loadVehicleModelsFailure,
  loadVehicleTypes,
  loadVehicleTypesSuccess,
  loadVehicleTypesFailure,
} from './actions';
import { VehicleBrand } from '../vehicles/models/vehicle-brand.model';

@Injectable()
export class VehicleEffects {
  private vehicleService = inject(VehicleService);
  private actions$ = inject(Actions);

  loadVehicleBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVehicleBrands),
      switchMap(() =>
        this.vehicleService.getBrands().pipe(
          map((brands: VehicleBrand[]) => loadVehicleBrandsSuccess({ brands })),
          catchError((error) =>
            of(loadVehicleBrandsFailure({ error: error?.message || 'Failed to load vehicle brands' }))
          )
        )
      )
    )
  );

  loadVehicleModels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVehicleModels),
      switchMap((action) =>
        this.vehicleService.getModelsByMake(action.make).pipe(
          map((models) => loadVehicleModelsSuccess({ models })),
          catchError((error) =>
            of(loadVehicleModelsFailure({ error: error?.message || 'Failed to load vehicle models' }))
          )
        )
      )
    )
  );

  loadVehicleTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVehicleTypes),
      switchMap((action) =>
        this.vehicleService.getVehicleTypesByMake(action.make).pipe(
          map((vehicleTypes) => loadVehicleTypesSuccess({ vehicleTypes })),
          catchError((error) =>
            of(loadVehicleTypesFailure({ error: error?.message || 'Failed to load vehicle types' }))
          )
        )
      )
    )
  );
}
