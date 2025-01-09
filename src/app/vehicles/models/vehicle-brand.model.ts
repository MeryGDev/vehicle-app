export interface VehicleApiResponse {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: VehicleMake[];
}

export interface VehicleMake {
  Make_ID: number;
  Make_Name: string;
}
