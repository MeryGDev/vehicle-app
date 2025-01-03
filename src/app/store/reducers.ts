import { createReducer, on } from '@ngrx/store';
import {
  loadVehicleBrands,
  loadVehicleBrandsSuccess,
  loadVehicleBrandsFailure,
  filterVehicleBrands,
  loadVehicleModelsSuccess,
  loadVehicleModelsFailure,
  loadVehicleTypesSuccess,
  loadVehicleTypesFailure,
  loadVehicleModels,
  loadVehicleTypes,
  resetVehicleData,
} from './actions';
import { VehicleBrand } from '../vehicles/models/vehicle-brand.model';
import { VehicleModel } from '../vehicles/models/vehicle-model.model';
import { VehicleType } from '../vehicles/models/vehicle-type.model';

export interface VehicleState {
  brands: VehicleBrand[];
  filteredBrands: VehicleBrand[];
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
  on(loadVehicleBrands, (state) => ({ ...state, loadingBrands: true })), // Activar estado de carga
  on(loadVehicleBrandsSuccess, (state, { brands }) => ({
    ...state,
    brands,
    filteredBrands: brands,
    loadingBrands: false,
    error: null,
  })),
  on(loadVehicleBrandsFailure, (state, { error }) => ({
    ...state,
    loadingBrands: false,
    error,
  })),
  on(filterVehicleBrands, (state, { searchQuery }) => {
    const filteredBrands = state.brands.filter((brand) =>
      brand.Make_Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...state,
      searchQuery,
      filteredBrands,
    };
  }),
  on(loadVehicleModels, (state) => ({ ...state, loadingModels: true })),
  on(loadVehicleModelsSuccess, (state, { models }) => ({
    ...state,
    loadingModels: false,
    models,
    error: null,
  })),
  on(loadVehicleModelsFailure, (state, { error }) => ({
    ...state,
    loadingModels: false,
    error,
  })),
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
  on(resetVehicleData, (state) => ({
    ...state,
    models: [],
    vehicleTypes: [],
    error: null,
    loadingModels: false,
    loadingTypes: false,
  }))
);
