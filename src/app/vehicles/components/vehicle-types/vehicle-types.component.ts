import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleType } from '../../models/vehicle-type.model';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-vehicle-types',
  imports: [CommonModule, MaterialModule],
  templateUrl: './vehicle-types.component.html',
  styleUrl: './vehicle-types.component.scss',
})
export class VehicleTypesComponent {
  @Input() types: VehicleType[] = [];
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  @Output() onSelectType: EventEmitter<string> = new EventEmitter();

  trackByVehicleTypeId(index: number, type: VehicleType): number {
    return type.VehicleTypeId;
  }

  selectType(type: VehicleType): void {
    this.onSelectType.emit(type.VehicleTypeName);
  }

  get uniqueTypes(): VehicleType[] {
    return Array.from(new Set(this.types.map((a) => a.VehicleTypeName)))
      .map((name) => this.types.find((a) => a.VehicleTypeName === name))
      .filter((type): type is VehicleType => type !== undefined); // Filtra los undefined
  }
}
