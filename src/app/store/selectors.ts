import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VehicleState } from './reducers';

export const selectVehicleState = createFeatureSelector<VehicleState>('vehicles');

export const selectVehicleMakes = createSelector(selectVehicleState, (state: VehicleState) => state.brands);

export const selectFilteredVehicleMakes = createSelector(
  selectVehicleState,
  (state: VehicleState) => state.filteredBrands ?? []
);

export const selectVehicleModels = createSelector(selectVehicleState, (state: VehicleState) => state.models ?? []);

export const selectVehicleTypes = createSelector(selectVehicleState, (state: VehicleState) => state.vehicleTypes ?? []);

export const selectLoadingBrands = createSelector(selectVehicleState, (state: VehicleState) => state.loadingBrands);

export const selectLoadingModels = createSelector(selectVehicleState, (state: VehicleState) => state.loadingModels);

export const selectLoadingTypes = createSelector(selectVehicleState, (state: VehicleState) => state.loadingTypes);

export const selectError = createSelector(selectVehicleState, (state: VehicleState) => state.error);
