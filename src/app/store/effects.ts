import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { VehicleService } from '../vehicles/services/vehicle.service';
import {
  loadVehicleMakes,
  loadVehicleMakesSuccess,
  loadVehicleMakesFailure,
  // loadVehicleModels,
  // loadVehicleModelsSuccess,
  // loadVehicleModelsFailure,
  loadVehicleModelsByType,
  loadVehicleModelsByTypeSuccess,
  loadVehicleModelsByTypeFailure,
  loadVehicleTypes,
  loadVehicleTypesSuccess,
  loadVehicleTypesFailure,
} from './actions';
import { VehicleMake } from '../vehicles/models/vehicle-brand.model';
import { VehicleModel } from '../vehicles/models/vehicle-model.model';

@Injectable()
export class VehicleEffects {
  private vehicleService = inject(VehicleService);
  private actions$ = inject(Actions);

  loadVehicleMakes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVehicleMakes),
      switchMap(() =>
        this.vehicleService.getMakes().pipe(
          map((brands: VehicleMake[]) => loadVehicleMakesSuccess({ brands })),
          catchError((error) =>
            of(loadVehicleMakesFailure({ error: error?.message || 'Failed to load vehicle brands' }))
          )
        )
      )
    )
  );

  // loadVehicleModels$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadVehicleModels),
  //     switchMap((action) =>
  //       this.vehicleService.getModelsByMake(action.make).pipe(
  //         map((models) => loadVehicleModelsSuccess({ models })),
  //         catchError((error) =>
  //           of(loadVehicleModelsFailure({ error: error?.message || 'Failed to load vehicle models' }))
  //         )
  //       )
  //     )
  //   )
  // );

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

  loadVehicleModelsByType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVehicleModelsByType),
      switchMap((action) =>
        this.vehicleService.getModelsForMakeAndType(action.make, action.vehicleType).pipe(
          map((models: VehicleModel[]) => loadVehicleModelsByTypeSuccess({ models })),
          catchError((error) =>
            of(
              loadVehicleModelsByTypeFailure({
                error: error?.message || 'Failed to load vehicle models by type',
              })
            )
          )
        )
      )
    )
  );
}
