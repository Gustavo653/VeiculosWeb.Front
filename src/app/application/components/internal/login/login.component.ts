import { Component } from '@angular/core';
import { AuthService } from 'src/app/application/service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
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
                padding-left: 1.0rem;
            }
        `,
    ],
})
export class LoginComponent {
    usuario: any = {
        usuario: '',
        senha: '',
    };

    hidden: boolean = true;

    onSubmit(form: any) {
        this.hidden = false;
        if (form.valid) {
            this.authService.login(form.value.email, form.value.senha).subscribe(
                async (res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sua solicitação foi processada com sucesso!',
                        detail: `Estamos lhe redirecionando para a página principal.`,
                    });
                    this.hidden = true;
                    this.authService.saveToken(res.object.token ?? '');
                    this.navigateToHome();
                },
                (err: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Houve um erro ao processar sua solicitação!',
                        detail: `Código: ${err.status} \n Mensagem: ${err.error.message}`,
                    });
                    this.hidden = true;
                }
            );
        }
    }

    navigateToHome() {
        this.router.navigate(['']);
    }

    navigateToRegister() {
        this.router.navigate(['/register']);
    }

    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }
}
