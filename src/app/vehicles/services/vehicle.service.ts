import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { VehicleApiResponse, VehicleBrand } from '../models/vehicle-brand.model';
import { VehicleModel, VehicleModelsResponse } from '../models/vehicle-model.model';
import { VehicleType, VehicleTypesResponse } from '../models/vehicle-type.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';
  private http = inject(HttpClient);

  getBrands(): Observable<VehicleBrand[]> {
    const url = `${this.apiUrl}/getallmakes?format=json`;
    return this.http.get<VehicleApiResponse>(url).pipe(
      map((response) => {
        console.log('API Response:', response);
        return response.Results;
      })
    );
  }

  getModelsByMake(make: string): Observable<VehicleModel[]> {
    const url = `${this.apiUrl}/getmodelsformake/${make}?format=json`;
    return this.http.get<VehicleModelsResponse>(url).pipe(map((response) => response.Results));
  }

  getVehicleTypesByMake(make: string): Observable<VehicleType[]> {
    const url = `${this.apiUrl}/getvehicletypesformake/${make}?format=json`;
    return this.http.get<VehicleTypesResponse>(url).pipe(map((response) => response.Results));
  }
}
