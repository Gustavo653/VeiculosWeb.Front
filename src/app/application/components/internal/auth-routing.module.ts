import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'error', component: ErrorComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'confirm-code', component: ConfirmCodeComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
