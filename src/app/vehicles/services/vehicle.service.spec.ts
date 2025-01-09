import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { VehicleService } from './vehicle.service';
import { VehicleApiResponse } from '../models/vehicle-make.model';
import { VehicleTypesResponse } from '../models/vehicle-type.model';
import { VehicleModelsResponse } from '../models/vehicle-model.model';

describe('VehicleService', () => {
  let service: VehicleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(VehicleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getMakes', () => {
    it('should retrieve a list of vehicle makes', () => {
      const mockResponse: VehicleApiResponse = {
        Count: 2,
        Message: 'Response returned successfully',
        SearchCriteria: null,
        Results: [
          { Make_ID: 1, Make_Name: 'Toyota' },
          { Make_ID: 2, Make_Name: 'Honda' },
        ],
      };

      service.getMakes().subscribe((makes) => {
        expect(makes.length).toBe(2);
        expect(makes[0].Make_Name).toBe('Toyota');
        expect(makes[1].Make_Name).toBe('Honda');
      });

      const req = httpTestingController.expectOne('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse); // Envía la respuesta simulada
    });

    it('should return an empty array on error', () => {
      service.getMakes().subscribe((makes) => {
        expect(makes).toEqual([]);
      });

      const req = httpTestingController.expectOne('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json');
      req.flush(null, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('#getVehicleTypesByMake', () => {
    it('should retrieve vehicle types for a given make', () => {
      const mockResponse: VehicleTypesResponse = {
        Count: 1,
        Message: 'Response returned successfully',
        SearchCriteria: 'make=Toyota',
        Results: [{ VehicleTypeId: 1, VehicleTypeName: 'SUV' }],
      };

      service.getVehicleTypesByMake('Toyota').subscribe((types) => {
        expect(types.length).toBe(1);
        expect(types[0].VehicleTypeName).toBe('SUV');
      });

      const req = httpTestingController.expectOne(
        'https://vpic.nhtsa.dot.gov/api/vehicles/getvehicletypesformake/Toyota?format=json'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should return an empty array on error', () => {
      service.getVehicleTypesByMake('Toyota').subscribe((types) => {
        expect(types).toEqual([]);
      });

      const req = httpTestingController.expectOne(
        'https://vpic.nhtsa.dot.gov/api/vehicles/getvehicletypesformake/Toyota?format=json'
      );
      req.flush(null, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('#getModelsForMakeAndType', () => {
    it('should retrieve vehicle models for a given make and type', () => {
      const mockResponse: VehicleModelsResponse = {
        Count: 1,
        Message: 'Response returned successfully',
        SearchCriteria: 'make=Toyota&vehicleType=SUV',
        Results: [
          {
            Make_ID: 1,
            Make_Name: 'Toyota',
            Model_ID: 101,
            Model_Name: 'RAV4',
            VehicleTypeId: 1,
            VehicleTypeName: 'SUV',
          },
        ],
      };

      service.getModelsForMakeAndType('Toyota', 'SUV').subscribe((models) => {
        expect(models.length).toBe(1);
        expect(models[0].Model_Name).toBe('RAV4');
      });

      const req = httpTestingController.expectOne(
        'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/Toyota/vehicleType/SUV?format=json'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should return an empty array on error', () => {
      service.getModelsForMakeAndType('Toyota', 'SUV').subscribe((models) => {
        expect(models).toEqual([]);
      });

      const req = httpTestingController.expectOne(
        'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/Toyota/vehicleType/SUV?format=json'
      );
      req.flush(null, { status: 500, statusText: 'Server Error' });
    });
  });
});
