// export interface VehicleModel {
//   Make_ID: number;
//   Make_Name: string;
//   Model_ID: number;
//   Model_Name: string;
//   ModelYear: string;
// }

// export interface VehicleModelsResponse {
//   Count: number;
//   Message: string;
//   Results: VehicleModel[];
// }

export interface VehicleModel {
  Make_ID: number;        // ID de la marca
  Make_Name: string;      // Nombre de la marca
  Model_ID: number;       // ID del modelo
  Model_Name: string;     // Nombre del modelo
  VehicleTypeId: number;  // ID del tipo de vehículo (ej. 3)
  VehicleTypeName: string; // Nombre del tipo de vehículo (ej. "Truck")
}

export interface VehicleModelsResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleModel[];  // Aquí es donde recibes los modelos
}
