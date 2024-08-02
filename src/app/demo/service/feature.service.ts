import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class FeatureService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    private getAPIURL(): Observable<string> {
        return this.storageService.getAPIURL();
    }

    getFeatures(vehicleType: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/feature/GetFeaturesByVehicleType/${vehicleType}`;
                return this.http.get(apiUrl);
            })
        );
    }

    createFeature(data: any): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/feature`;
                return this.http.post(apiUrl, data);
            })
        );
    }

    updateFeature(id: string, data: any): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/feature/${id}`;
                return this.http.put(apiUrl, data);
            })
        );
    }

    deleteFeature(id: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/feature/${id}`;
                return this.http.delete(apiUrl);
            })
        );
    }
}
