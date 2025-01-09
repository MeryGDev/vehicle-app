import { createReducer, on } from '@ngrx/store';
import {
  loadVehicleMakes,
  loadVehicleMakesSuccess,
  loadVehicleMakesFailure,
  filterVehicleMakes,
  loadVehicleModelsSuccess,
  loadVehicleModelsFailure,
  loadVehicleTypesSuccess,
  loadVehicleTypesFailure,
  loadVehicleModels,
  loadVehicleTypes,
  resetVehicleData,
  loadVehicleModelsByType,
  loadVehicleModelsByTypeFailure,
  loadVehicleModelsByTypeSuccess,
} from './actions';
import { VehicleMake } from '../vehicles/models/vehicle-brand.model';
import { VehicleModel } from '../vehicles/models/vehicle-model.model';
import { VehicleType } from '../vehicles/models/vehicle-type.model';

export interface VehicleState {
  brands: VehicleMake[];
  filteredBrands: VehicleMake[];
  models: VehicleModel[];
  vehicleTypes: VehicleType[];
  loadingBrands: boolean;
  loadingModels: boolean;
  loadingTypes: boolean;
  error: string | null;
  searchQuery: string;
}

export const initialState: VehicleState = {
  brands: [],
  filteredBrands: [],
  models: [],
  vehicleTypes: [],
  loadingBrands: false,
  loadingModels: false,
  loadingTypes: false,
  error: null,
  searchQuery: '',
};

export const vehicleReducer = createReducer(
  initialState,
  on(loadVehicleMakes, (state) => ({ ...state, loadingBrands: true })), // Activar estado de carga
  on(loadVehicleMakesSuccess, (state, { brands }) => ({
    ...state,
    brands,
    filteredBrands: brands,
    loadingBrands: false,
    error: null,
  })),
  on(loadVehicleMakesFailure, (state, { error }) => ({
    ...state,
    loadingBrands: false,
    error,
  })),
  on(filterVehicleMakes, (state, { searchQuery }) => {
    const filteredBrands = state.brands.filter((brand) =>
      brand.Make_Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...state,
      searchQuery,
      filteredBrands,
    };
  }),
  on(loadVehicleTypes, (state) => ({ ...state, loadingTypes: true })),
  on(loadVehicleTypesSuccess, (state, { vehicleTypes }) => ({
    ...state,
    loadingTypes: false,
    vehicleTypes,
    error: null,
  })),
  on(loadVehicleTypesFailure, (state, { error }) => ({
    ...state,
    loadingTypes: false,
    error,
  })),
  on(loadVehicleModelsByType, (state) => ({ ...state, loadingModels: true })),
  on(loadVehicleModelsByTypeSuccess, (state, { models }) => ({
    ...state,
    loadingModels: false,
    models,
    error: null,
  })),
  on(loadVehicleModelsByTypeFailure, (state, { error }) => ({
    ...state,
    loadingModels: false,
    error,
  })),
  on(resetVehicleData, (state) => ({
    ...state,
    models: [],
    vehicleTypes: [],
    error: null,
    loadingModels: false,
    loadingTypes: false,
  }))
);
