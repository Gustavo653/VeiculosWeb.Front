import { Component } from '@angular/core';
import { AuthService } from 'src/app/application/service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageBundle } from '@angular/compiler';
import { MessageServiceSuccess } from 'src/app/application/api/base';

@Component({
    templateUrl: './confirm-code.component.html',
    styles: [
        `
            :host ::ng-deep .p-password input {
                width: 100%;
                padding: 1rem;
            }

            :host ::ng-deep .p-input-icon-right .p-inputtext {
                padding-left: 2.5rem;
            }

            :host ::ng-deep .p-icon-wrapper {
                padding-left: 1rem;
            }
        `,
    ],
})
export class ConfirmCodeComponent {
    user: any = {};
    hidden: boolean = true;

    confirmEmail() {
        if (this.validateData()) {
            this.hidden = false;
            this.authService.confirmEmail(this.user).subscribe(
                () => {
                    this.messageService.add(MessageServiceSuccess);
                    this.hidden = true;
                    console.log('redirect');
                    this.navigateToLogin();
                },
                () => {
                    this.hidden = true;
                }
            );
        }
    }

    validateData(): boolean {
        if (!this.user.email || !this.user.code || !this.user.password) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos obrigatórios.' });
            return false;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(this.user.password)) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'A senha deve ter no mínimo 6 caracteres, contendo letras e números.' });
            return false;
        }

        return true;
    }

    navigateToHome() {
        this.router.navigate(['']);
    }

    navigateToLogin() {
        this.router.navigate(['/internal/login']);
    }

    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}
}
