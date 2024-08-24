import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SellCarComponent } from './sell-car/sell-car.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'sell-car', component: SellCarComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class NegotiateRoutingModule {}
