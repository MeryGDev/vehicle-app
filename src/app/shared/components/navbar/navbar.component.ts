import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { VehicleService } from '../../../vehicles/services/vehicle.service';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
