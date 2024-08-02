import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class FuelService {
    constructor(private http: HttpClient, private storageService: StorageService) { }

    private getAPIURL(): Observable<string> {
        return this.storageService.getAPIURL();
    }

    getFuels(): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/fuel`;
                return this.http.get(apiUrl);
            })
        );
    }

    createFuel(data: any): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/fuel`;
                return this.http.post(apiUrl, data);
            })
        );
    }

    updateFuel(id: string, data: any): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/fuel/${id}`;
                return this.http.put(apiUrl, data);
            })
        );
    }

    deleteFuel(id: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/fuel/${id}`;
                return this.http.delete(apiUrl);
            })
        );
    }
}
