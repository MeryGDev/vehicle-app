import { Routes } from '@angular/router';
import { VehicleBrandListComponent } from './vehicles/components/vehicle-brand-list/vehicle-brand-list.component';
import { VehicleDetailComponent } from './vehicles/components/vehicle-detail/vehicle-detail.component';

export const routes: Routes = [
  { path: '', component: VehicleBrandListComponent },
  { path: 'vehicle/:id', component: VehicleDetailComponent },
];
