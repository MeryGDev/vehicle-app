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

  // Método para navegar a la página de inicio (listado de marcas)
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  // Método para navegar a la página de búsqueda
  navigateToSearch(): void {
    this.router.navigate(['/search']);
  }

  // ngOnInit(): void {
  //   this.vehicleService.getMakes().subscribe({
  //     next: (brands) => {
  //       console.log('Marcas de vehículos obtenidas:', brands);
  //     },
  //     error: (err) => {
  //       console.error('Error al obtener marcas:', err);
  //     },
  //   });
  // }
}
