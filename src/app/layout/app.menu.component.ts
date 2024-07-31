import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../demo/service/auth.service';
import { Router } from '@angular/router';
import { MenuRoutes } from '../demo/api/base';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styles: [
        `
            .user-profile {
                display: flex;
                align-items: center;
                margin-top: 30px;
            }
        `,
    ],
})
export class AppMenuComponent {
    model: any[] = MenuRoutes.filter((route) => {
        var role = this.authService.getRole() ?? 'Basic'
        return route.role.includes('Basic') || (route.role.includes(role) && role === 'Admin');
      });

    constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router) { }

    redirectToLogin() {
        this.authService.clearData();
        this.router.navigate(['/login']);
    }

    isUserRegistered(): boolean {
        return this.authService.getToken() != null;
    }

    showName(): string {
        const user = this.authService.getFirstName();
        const username = typeof user === 'string' ? user.toUpperCase() : 'Seja bem-vindo';
        return username;
    }
}
