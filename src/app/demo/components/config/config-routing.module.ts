import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuelComponent } from './fuel/fuel.component';
import { BrandComponent } from './brand/brand.component';
import { ModelComponent } from './model/model.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { GearboxComponent } from './gearbox/gearbox.component';
import { ColorComponent } from './color/color.component';
import { FeatureComponent } from './feature/feature.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'fuels', component: FuelComponent },
            { path: 'gearboxes', component: GearboxComponent },
            { path: 'features/:type', component: FeatureComponent },
            { path: 'colors', component: ColorComponent },
            { path: 'brands/:type', component: BrandComponent },
            { path: 'models/:type', component: ModelComponent },
            { path: 'states', component: StateComponent },
            { path: 'cities', component: CityComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class ConfigRoutingModule {}
