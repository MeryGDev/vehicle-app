import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { VehicleService } from './vehicle.service';

describe('VehicleService', () => {
  let service: VehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleService, provideHttpClient()],
    });
    service = TestBed.inject(VehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
