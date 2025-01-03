import { createAction, props } from '@ngrx/store';
import { VehicleBrand } from '../vehicles/models/vehicle-brand.model';
import { VehicleModel } from '../vehicles/models/vehicle-model.model';
import { VehicleType } from '../vehicles/models/vehicle-type.model';

export const loadVehicleBrands = createAction('[Vehicles] Load Brands');
export const loadVehicleBrandsSuccess = createAction(
  '[Vehicles] Load Brands Success',
  props<{ brands: VehicleBrand[] }>()
);
export const loadVehicleBrandsFailure = createAction(
  '[Vehicles] Load Brands Failure',
  props<{ error: string }>()
);

export const filterVehicleBrands = createAction(
  '[Vehicle] Filter Brands',
  props<{ searchQuery: string }>()
);

export const loadVehicleModels = createAction(
  '[Vehicle] Load Vehicle Models',
  props<{ make: string }>()
);

export const loadVehicleModelsSuccess = createAction(
  '[Vehicle] Load Vehicle Models Success',
  props<{ models: VehicleModel[] }>()
);

export const loadVehicleModelsFailure = createAction(
  '[Vehicle] Load Vehicle Models Failure',
  props<{ error: string }>()
);

export const loadVehicleTypes = createAction(
  '[Vehicle] Load Vehicle Types',
  props<{ make: string }>()
);

export const loadVehicleTypesSuccess = createAction(
  '[Vehicle] Load Vehicle Types Success',
  props<{ vehicleTypes: VehicleType[] }>()
);

export const loadVehicleTypesFailure = createAction(
  '[Vehicle] Load Vehicle Types Failure',
  props<{ error: string }>()
);

export const resetVehicleData = createAction('[Vehicle] Reset Data');