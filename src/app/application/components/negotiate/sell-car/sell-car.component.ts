import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { BrandService } from 'src/app/application/service/brand.service';
import { CityService } from 'src/app/application/service/city.service';
import { ColorService } from 'src/app/application/service/color.service';
import { FeatureService } from 'src/app/application/service/feature.service';
import { FuelService } from 'src/app/application/service/fuel.service';
import { GearboxService } from 'src/app/application/service/gearbox.service';
import { ModelService } from 'src/app/application/service/model.service';
import { StateService } from 'src/app/application/service/state.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './sell-car.component.html',
    providers: [MessageService, ConfirmationService],
})
export class SellCarComponent implements OnInit {
    loading: boolean = true;
    vehicleType: string = 'car';

    brands: any[] = [];
    models: any[] = [];
    colors: any[] = [];
    gearboxes: any[] = [];
    fuels: any[] = [];
    features: any[] = [];
    states: any[] = [];
    cities: any[] = [];

    brandId: string = '';
    modelId: string = '';
    colorId: string = '';
    gearboxId: string = '';
    fuelId: string = '';
    featureId: string = '';
    stateId: string = '';
    cityId: string = '';

    constructor(
        protected layoutService: LayoutService,
        private brandService: BrandService,
        private modelService: ModelService,
        private colorService: ColorService,
        private gearboxService: GearboxService,
        private fuelService: FuelService,
        private featureService: FeatureService,
        private stateService: StateService,
        private cityService: CityService
    ) {}

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;

        const colorObservable = this.colorService.getColors();
        const brandObservable = this.brandService.getBrands(this.vehicleType);
        const gearboxObservable = this.gearboxService.getGearboxes();
        const fuelObservable = this.fuelService.getFuels();
        const featureObservable = this.featureService.getFeatures(this.vehicleType);
        const stateObservable = this.stateService.getStates();

        forkJoin([colorObservable, brandObservable, gearboxObservable, fuelObservable, featureObservable, stateObservable]).subscribe((results) => {
            this.colors = results[0].object;
            this.brands = results[1].object;
            this.gearboxes = results[2].object;
            this.fuels = results[3].object;
            this.features = results[4].object;
            this.states = results[5].object;
            this.loading = false;
        });
    }
}
