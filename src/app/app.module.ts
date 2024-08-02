import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './application/components/notfound/notfound.component';
import { AuthService } from './application/service/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicInterceptor } from './application/components/internal/basic.interceptor';
import { StorageService } from './application/service/storage.service';
import { ErrorInterceptor } from './application/components/internal/error.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthModule } from './application/components/internal/auth.module';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        AuthModule,
        ToastModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: BasicInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AuthService,
        ConfirmationService,
        MessageService,
        StorageService,
    ],
    bootstrap: [AppComponent],
    exports: [],
})
export class AppModule {}
