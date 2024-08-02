import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class GearboxService {
    constructor(private http: HttpClient, private storageService: StorageService) { }

    private getAPIURL(): Observable<string> {
        return this.storageService.getAPIURL();
    }

    getGearboxes(): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/gearbox`;
                return this.http.get(apiUrl);
            })
        );
    }

    createGearbox(data: any): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/gearbox`;
                return this.http.post(apiUrl, data);
            })
        );
    }

    updateGearbox(id: string, data: any): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/gearbox/${id}`;
                return this.http.put(apiUrl, data);
            })
        );
    }

    deleteGearbox(id: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/gearbox/${id}`;
                return this.http.delete(apiUrl);
            })
        );
    }
}
