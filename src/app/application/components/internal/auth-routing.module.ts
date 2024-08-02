import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'error', component: ErrorComponent },
            { path: 'login', component: LoginComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
