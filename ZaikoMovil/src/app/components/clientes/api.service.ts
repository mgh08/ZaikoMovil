import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  getRegisters(): Observable<any[]> {
    return this.http.get<any[]>(`${global.apiUrl}/Cliente/`);
  }

  getRegisterById(id: number): Observable<any> {
    return this.http.get<any>(`${global.apiUrl}/Cliente/${id}/`);
  }

  addRegister(post: any): Observable<any> {
    return this.http.post<any>(`${global.apiUrl}/Cliente/`, post);
  }

  updateRegister(id: number, post: any): Observable<any> {
    console.log(`datos: ${post.nombre_categoria} - ${post.descripcion}`)
    return this.http.put<any>(`${global.apiUrl}/Cliente/${id}/`, post);
  }

  deleteRegister(id: number): Observable<any> {
    return this.http.delete<any>(`${global.apiUrl}/Cliente/${id}/`);
  }
}

