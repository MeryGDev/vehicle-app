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
import { VehicleMake } from '../vehicles/models/vehicle-make.model';
import { VehicleModel } from '../vehicles/models/vehicle-model.model';
import { VehicleType } from '../vehicles/models/vehicle-type.model';

export interface VehicleState {
  makes: VehicleMake[];
  filteredMakes: VehicleMake[];
  models: VehicleModel[];
  vehicleTypes: VehicleType[];
  loadingMakes: boolean;
  loadingModels: boolean;
  loadingTypes: boolean;
  error: string | null;
  searchQuery: string;
}

export const initialState: VehicleState = {
  makes: [],
  filteredMakes: [],
  models: [],
  vehicleTypes: [],
  loadingMakes: false,
  loadingModels: false,
  loadingTypes: false,
  error: null,
  searchQuery: '',
};

export const vehicleReducer = createReducer(
  initialState,
  on(loadVehicleMakes, (state) => ({ ...state, loadingMakes: true })), // Activar estado de carga
  on(loadVehicleMakesSuccess, (state, { makes }) => ({
    ...state,
    makes,
    filteredMakes: makes,
    loadingMakes: false,
    error: null,
  })),
  on(loadVehicleMakesFailure, (state, { error }) => ({
    ...state,
    loadingMakes: false,
    error,
  })),
  on(filterVehicleMakes, (state, { searchQuery }) => {
    const filteredMakes = state.makes.filter((make) =>
      make.Make_Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...state,
      searchQuery,
      filteredMakes,
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
