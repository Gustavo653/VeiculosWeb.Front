import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuelComponent } from './fuel/fuel.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'fuels', component: FuelComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class ConfigRoutingModule {}
