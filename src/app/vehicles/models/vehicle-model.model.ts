export interface VehicleModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
  ModelYear: string;
}

export interface VehicleModelsResponse {
  Count: number;
  Message: string;
  Results: VehicleModel[];
}
