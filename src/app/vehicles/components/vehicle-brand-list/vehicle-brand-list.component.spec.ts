import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { VehicleMakeListComponent } from './vehicle-brand-list.component';
import { VehicleService } from '../../services/vehicle.service';

describe('VehicleMakeListComponent', () => {
  let component: VehicleMakeListComponent;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleMakeListComponent],
      providers: [provideHttpClient(), provideAnimations(), provideMockStore({ initialState: {} }), VehicleService],
    }).compileComponents();

    store = TestBed.inject(MockStore); // Inyectamos el MockStore
    const fixture = TestBed.createComponent(VehicleMakeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { VehicleMakeListComponent } from './vehicle-list.component';

// describe('VehicleMakeListComponent', () => {
//   let component: VehicleMakeListComponent;
//   let fixture: ComponentFixture<VehicleMakeListComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [VehicleMakeListComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(VehicleMakeListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
