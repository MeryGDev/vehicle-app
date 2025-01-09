import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { VehicleApiResponse, VehicleMake } from '../models/vehicle-make.model';
import { VehicleModel, VehicleModelsResponse } from '../models/vehicle-model.model';
import { VehicleType, VehicleTypesResponse } from '../models/vehicle-type.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';
  private http = inject(HttpClient);

  private sanitizeMake(make: string): string {
    const sanitized = make.trim().replace(/\.$/, ''); // Removes spaces and the trailing period
    return encodeURIComponent(sanitized);
  }

  getMakes(): Observable<VehicleMake[]> {
    const url = `${this.apiUrl}/getallmakes?format=json`;
    return this.http.get<VehicleApiResponse>(url).pipe(
      map((response) => response.Results),
      catchError((error) => {
        console.error('Error al cargar las marcas:', error);
        return of([]);
      })
    );
  }

  getVehicleTypesByMake(make: string): Observable<VehicleType[]> {
    const sanitizedMake = this.sanitizeMake(make);
    const url = `${this.apiUrl}/getvehicletypesformake/${sanitizedMake}?format=json`;
    return this.http.get<VehicleTypesResponse>(url).pipe(
      map((response) => response.Results),
      catchError((error) => {
        console.error('Error al cargar tipos de vehículos:', error);
        return of([]);
      })
    );
  }

  getModelsForMakeAndType(make: string, vehicleType: string): Observable<VehicleModel[]> {
    const sanitizedMake = this.sanitizeMake(make);
    const url = `${this.apiUrl}/getmodelsformakeyear/make/${sanitizedMake}/vehicleType/${vehicleType}?format=json`;
    return this.http.get<VehicleModelsResponse>(url).pipe(
      map((response) => response.Results),
      catchError((error) => {
        console.error('Error al cargar los modelos:', error);
        return of([]);
      })
    );
  }
}
