import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { VehicleBrandListComponent } from './vehicle-brand-list.component';
import { VehicleService } from '../../services/vehicle.service';

describe('VehicleBrandListComponent', () => {
  let component: VehicleBrandListComponent;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleBrandListComponent],
      providers: [provideHttpClient(), provideAnimations(), provideMockStore({ initialState: {} }), VehicleService],
    }).compileComponents();

    store = TestBed.inject(MockStore); // Inyectamos el MockStore
    const fixture = TestBed.createComponent(VehicleBrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { VehicleBrandListComponent } from './vehicle-list.component';

// describe('VehicleBrandListComponent', () => {
//   let component: VehicleBrandListComponent;
//   let fixture: ComponentFixture<VehicleBrandListComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [VehicleBrandListComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(VehicleBrandListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
