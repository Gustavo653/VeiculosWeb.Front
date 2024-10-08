import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private messageService: MessageService, private authService: AuthService) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 400) {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Ocorreu um erro ao validar os dados.',
                        detail: error.error.message,
                    });
                } else if (error.status === 401) {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Sua sessão expirou.',
                    });
                    this.authService.clearData();
                    this.router.navigate(['/internal/login']);
                } else if (error.status === 403) {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Você não tem permissão para acessar este recurso.',
                    });
                    this.router.navigate(['']);
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Houve um erro ao processar sua solicitação!',
                    });
                    this.router.navigate(['/internal/error'], {
                        queryParams: {
                            code: error.status,
                            message: error.message,
                            description: error.error.message,
                        },
                    });
                }
                return throwError(error);
            })
        );
    }
}
