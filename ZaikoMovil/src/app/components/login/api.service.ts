import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    login(datos: any): Observable<any> {
        return this.http.post<any>(`${global.apiUrl}/token-auth/`, datos);
    }
}
