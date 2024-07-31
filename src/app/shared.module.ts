import { NgModule } from '@angular/core';
import { BooleanPipe } from './demo/pipe/BooleanPipe';
import { VehicleTypePipe } from './demo/pipe/VehicleTypePipe';

@NgModule({
    declarations: [BooleanPipe, VehicleTypePipe],
    exports: [BooleanPipe, VehicleTypePipe],
})
export class SharedModule {}
