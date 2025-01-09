import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  loadVehicleMakes,
  loadVehicleMakesSuccess,
  loadVehicleMakesFailure,
  loadVehicleModelsByType,
  loadVehicleModelsByTypeSuccess,
  loadVehicleModelsByTypeFailure,
  loadVehicleTypes,
  loadVehicleTypesSuccess,
  loadVehicleTypesFailure,
} from './actions';
import { VehicleService } from '../vehicles/services/vehicle.service';
import { VehicleMake } from '../vehicles/models/vehicle-make.model';
import { VehicleModel } from '../vehicles/models/vehicle-model.model';
import { VehicleType } from '../vehicles/models/vehicle-type.model';

@Injectable()
export class VehicleEffects {
  private vehicleService = inject(VehicleService);
  private actions$ = inject(Actions);

  loadVehicleMakes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVehicleMakes),
      switchMap(() =>
        this.vehicleService.getMakes().pipe(
          map((makes: VehicleMake[]) => loadVehicleMakesSuccess({ makes })),
          catchError((error) =>
            of(loadVehicleMakesFailure({ error: error?.message || 'Failed to load vehicle makes' }))
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
          map((vehicleTypes: VehicleType[]) => loadVehicleTypesSuccess({ vehicleTypes })),
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
            of( loadVehicleModelsByTypeFailure({ error: error?.message || 'Failed to load vehicle models by type' }))
          )
        )
      )
    )
  );
}
