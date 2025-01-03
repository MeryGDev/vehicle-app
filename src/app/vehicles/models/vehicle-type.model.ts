export interface VehicleType {
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export interface VehicleTypesResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleType[];
}
