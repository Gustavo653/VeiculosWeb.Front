import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { switchMap } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    login(data: any) {
        return this.storageService.getAPIURL().pipe(
            switchMap((url) => {
                return this.http.post<any>(`${url}/Account/Login`, data);
            })
        );
    }

    createUser(data: any) {
        return this.storageService.getAPIURL().pipe(
            switchMap((url) => {
                return this.http.post<any>(`${url}/Account`, data);
            })
        );
    }

    confirmEmail(data: any) {
        return this.storageService.getAPIURL().pipe(
            switchMap((url) => {
                return this.http.post<any>(`${url}/Account/ConfirmEmail`, data);
            })
        );
    }

    public saveToken(token: string) {
        this.storageService.saveData('token', token);
    }

    public getToken() {
        return this.storageService.getData('token');
    }

    public saveRole(token: string) {
        this.storageService.saveData('role', token);
    }

    public getRole() {
        return this.storageService.getData('role');
    }

    public saveFirstName(token: string) {
        this.storageService.saveData('firstName', token);
    }

    public getFirstName() {
        return this.storageService.getData('firstName');
    }

    public removeToken() {
        return this.storageService.removeData('token');
    }

    public clearData() {
        this.storageService.clearData();
    }

    public async validarToken(): Promise<boolean> {
        const url = await this.storageService.getAPIURL().toPromise();

        if (this.getToken() == null) {
            return true;
        }

        try {
            let data = await this.http.get<any>(`${url}/Account/Current`).toPromise();
            this.saveFirstName(data.object.name);
            this.saveRole(data.object.role);
            return true;
        } catch (error) {
            return false;
        }
    }
}
