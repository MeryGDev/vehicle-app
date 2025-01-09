import { Routes } from '@angular/router';
import { VehicleMakeListComponent } from './vehicles/components/vehicle-make-list/vehicle-make-list.component';
import { VehicleDetailComponent } from './vehicles/components/vehicle-detail/vehicle-detail.component';

export const routes: Routes = [
  { path: 'vehicle/:id', component: VehicleDetailComponent },
  { path: '', component: VehicleMakeListComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
