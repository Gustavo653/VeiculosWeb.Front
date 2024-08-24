import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './application/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './application/components/internal/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'internal',
                    loadChildren: () => import('./application/components/internal/auth.module').then((m) => m.AuthModule),
                },
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            canActivate: [AuthGuard],
                            loadChildren: () => import('./application/components/home/home.module').then((m) => m.HomeModule),
                        },
                        {
                            path: 'config',
                            canActivate: [AuthGuard],
                            loadChildren: () => import('./application/components/config/config.module').then((m) => m.ConfigModule),
                        },
                        {
                            path: 'negotiate',
                            canActivate: [AuthGuard],
                            loadChildren: () => import('./application/components/negotiate/negotiate.module').then((m) => m.NegotiateModule),
                        },
                    ],
                },
                { path: 'pages/notfound', component: NotfoundComponent },
                { path: '**', redirectTo: 'pages/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class AppRoutingModule {}
