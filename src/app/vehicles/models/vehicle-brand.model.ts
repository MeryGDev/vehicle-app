export interface VehicleApiResponse {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: VehicleBrand[];
}

export interface VehicleBrand {
  Make_ID: number;
  Make_Name: string;
}
