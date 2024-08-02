import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class ColorService {
    constructor(private http: HttpClient, private storageService: StorageService) { }

    private getAPIURL(): Observable<string> {
        return this.storageService.getAPIURL();
    }

    getColors(): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/color`;
                return this.http.get(apiUrl);
            })
        );
    }

    createColor(data: any): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/color`;
                return this.http.post(apiUrl, data);
            })
        );
    }

    updateColor(id: string, data: any): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/color/${id}`;
                return this.http.put(apiUrl, data);
            })
        );
    }

    deleteColor(id: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/color/${id}`;
                return this.http.delete(apiUrl);
            })
        );
    }
}
