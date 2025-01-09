import { createAction, props } from '@ngrx/store';
import { VehicleMake } from '../vehicles/models/vehicle-make.model';
import { VehicleModel } from '../vehicles/models/vehicle-model.model';
import { VehicleType } from '../vehicles/models/vehicle-type.model';

export const loadVehicleMakes = createAction('[Vehicle] Load Makes');
export const loadVehicleMakesSuccess = createAction('[Vehicle] Load Makes Success', props<{ makes: VehicleMake[] }>());
export const loadVehicleMakesFailure = createAction('[Vehicle] Load Makes Failure', props<{ error: string }>());

export const loadVehicleTypes = createAction('[Vehicle] Load Vehicle Types', props<{ make: string }>());
export const loadVehicleTypesSuccess = createAction('[Vehicle] Load Vehicle Types Success', props<{ vehicleTypes: VehicleType[] }>());
export const loadVehicleTypesFailure = createAction('[Vehicle] Load Vehicle Types Failure', props<{ error: string }>());

export const loadVehicleModelsByType = createAction('[Vehicle] Load Models By Type', props<{ make: string; vehicleType: string }>());
export const loadVehicleModelsByTypeSuccess = createAction('[Vehicle] Load Models By Type Success', props<{ models: VehicleModel[] }>());
export const loadVehicleModelsByTypeFailure = createAction('[Vehicle] Load Models By Type Failure', props<{ error: string }>());

export const filterVehicleMakes = createAction('[Vehicle] Filter Makes', props<{ searchQuery: string }>());
export const resetVehicleData = createAction('[Vehicle] Reset Data');
