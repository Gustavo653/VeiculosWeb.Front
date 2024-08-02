import { NgModule } from '@angular/core';
import { BooleanPipe } from './application/pipe/BooleanPipe';
import { VehicleTypePipe } from './application/pipe/VehicleTypePipe';

@NgModule({
    declarations: [BooleanPipe, VehicleTypePipe],
    exports: [BooleanPipe, VehicleTypePipe],
})
export class SharedModule {}
