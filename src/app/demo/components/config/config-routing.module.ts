import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuelComponent } from './fuel/fuel.component';
import { BrandComponent } from './brand/brand.component';
import { ModelComponent } from './model/model.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'fuels', component: FuelComponent },
            { path: 'brands/:type', component: BrandComponent },
            { path: 'models/:type', component: ModelComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class ConfigRoutingModule {}
