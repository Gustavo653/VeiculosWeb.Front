import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'vehicleType' })
export class VehicleTypePipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'Car':
                return 'Carro';
            default:
                return 'Moto';
        }
    }
}
