import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { AtomicModule } from '../atomic/atomic.module';
import { DataViewModule } from 'primeng/dataview';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfigRoutingModule } from './config-routing.module';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { FuelComponent } from './fuel/fuel.component';
import { BrandComponent } from './brand/brand.component';
import { ModelComponent } from './model/model.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { GearboxComponent } from './gearbox/gearbox.component';
import { FeatureComponent } from './feature/feature.component';
import { ColorComponent } from './color/color.component';

@NgModule({
    declarations: [
        FuelComponent,
        GearboxComponent,
        FeatureComponent,
        ColorComponent,
        BrandComponent,
        ModelComponent,
        StateComponent,
        CityComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DialogModule,
        ConfirmDialogModule,
        ProgressBarModule,
        DataViewModule,
        SelectButtonModule,
        FormsModule,
        AtomicModule,
        ButtonModule,
        CalendarModule,
        InputTextareaModule,
        ListboxModule,
        InputNumberModule,
        FieldsetModule,
        DropdownModule,
        ToastModule,
        FileUploadModule,
        InputTextModule,
        ConfigRoutingModule,
    ],
})
export class ConfigModule {}
