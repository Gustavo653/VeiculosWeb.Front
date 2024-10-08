import { Component } from '@angular/core';
import { AuthService } from 'src/app/application/service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './login.component.html',
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
export class LoginComponent {
    user: any = {};
    hidden: boolean = true;

    login() {
        if (this.validateData()) {
            this.hidden = false;
            this.authService.login(this.user).subscribe(
                (res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sua solicitação foi processada com sucesso!',
                        detail: `Estamos lhe redirecionando para a página principal.`,
                    });
                    this.hidden = true;
                    this.authService.saveToken(res.object.token ?? '');
                    this.navigateToHome();
                },
                () => {
                    this.hidden = true;
                }
            );
        }
    }

    validateData(): boolean {
        if (!this.user.email || !this.user.password) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos obrigatórios.' });
            return false;
        }

        return true;
    }

    navigateToHome() {
        this.router.navigate(['']);
    }

    navigateToRegister() {
        this.router.navigate(['/internal/register']);
    }

    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}
}
