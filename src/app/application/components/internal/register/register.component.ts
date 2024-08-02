import { Component } from '@angular/core';
import { AuthService } from 'src/app/application/service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './register.component.html',
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
export class RegisterComponent {
    user: any = {};
    hidden: boolean = true;

    createUser() {
        if (this.validateData()) {
            this.hidden = false;
            this.authService.createUser(this.user).subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Seu usuário foi processada com sucesso!',
                        detail: `Obtenha o código enviado no seu e-mail.`,
                    });
                    this.hidden = true;
                    this.navigateToConfirmCode();
                },
                () => {
                    this.hidden = true;
                }
            );
        }
    }

    validateData(): boolean {
        if (!this.user.email || !this.user.name) {
            this.messageService.add({ severity: 'error', summary: 'Preencha todos os campos obrigatórios.' });
            return false;
        }

        return true;
    }

    navigateToConfirmCode() {
        this.router.navigate(['/internal/confirm-code']);
    }

    navigateToLogin() {
        this.router.navigate(['/internal/login']);
    }

    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}
}
