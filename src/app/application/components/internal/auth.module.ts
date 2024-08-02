import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { AtomicModule } from '../atomic/atomic.module';
import { RegisterComponent } from './register/register.component';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';

@NgModule({
    declarations: [ErrorComponent, LoginComponent, RegisterComponent, ConfirmCodeComponent],
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
        PasswordModule,
        AuthRoutingModule,
    ],
})
export class AuthModule {}
